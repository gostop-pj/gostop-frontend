import * as PIXI from 'pixi.js';
import { createCard, CARD_WIDTH, CARD_HEIGHT } from './cardHelpers';

export interface Player {
	id: string;
	name: string;
	position: 'bottom' | 'top' | 'left' | 'right';
	cards: number;
	capturedCards: number;
	score: number;
}

interface PlayerAreaOptions {
	player: Player;
	stageWidth: number;
	stageHeight: number;
}

export function getPlayerPosition(position: string, stageWidth: number, stageHeight: number) {
	const positions = {
		bottom: { x: stageWidth / 2, y: stageHeight - 100 },
		top: { x: stageWidth / 2, y: 100 },
		left: { x: 100, y: stageHeight / 2 },
		right: { x: stageWidth - 100, y: stageHeight / 2 }
	};
	
	return positions[position as keyof typeof positions];
}

export function createPlayerArea(options: PlayerAreaOptions): PIXI.Container {
	const { player, stageWidth, stageHeight } = options;
	const pos = getPlayerPosition(player.position, stageWidth, stageHeight);
	
	const playerContainer = new PIXI.Container();
	playerContainer.x = pos.x;
	playerContainer.y = pos.y;
	
	// 플레이어 이름 배경
	const nameBg = new PIXI.Graphics();
	nameBg.roundRect(-50, -25, 100, 30, 15)
		.fill(0xffffff)
		.stroke({ width: 1, color: 0xe0e0e0 });
	playerContainer.addChild(nameBg);
	
	// 플레이어 이름
	const nameText = new PIXI.Text({
		text: player.name,
		style: {
			fontSize: 14,
			fill: 0x333333
		}
	});
	nameText.anchor.set(0.5);
	nameText.y = -10;
	playerContainer.addChild(nameText);
	
	// 점수 표시
	const scoreBg = new PIXI.Graphics();
	scoreBg.circle(60, -10, 15)
		.fill(0x4CAF50);
	playerContainer.addChild(scoreBg);
	
	const scoreText = new PIXI.Text({
		text: player.score.toString(),
		style: {
			fontSize: 12,
			fill: 0xffffff
		}
	});
	scoreText.anchor.set(0.5);
	scoreText.x = 60;
	scoreText.y = -10;
	playerContainer.addChild(scoreText);
	
	// 손패 카드들
	const handCards = createHandCards(player);
	playerContainer.addChild(handCards);
	
	// 획득한 카드 더미
	if (player.capturedCards > 0) {
		const capturedPile = createCapturedPile(player);
		playerContainer.addChild(capturedPile);
	}
	
	return playerContainer;
}

function createHandCards(player: Player): PIXI.Container {
	const handContainer = new PIXI.Container();
	const cardSpacing = 15;
	const totalWidth = (player.cards - 1) * cardSpacing;
	
	for (let i = 0; i < player.cards; i++) {
		let xOffset = -totalWidth/2 + i * cardSpacing;
		let yOffset = 30;
		let rotation = 0;
		
		// 위치별 카드 배치 조정
		if (player.position === 'left' || player.position === 'right') {
			rotation = player.position === 'left' ? -90 : 90;
			xOffset = 0;
			yOffset = -totalWidth/2 + i * cardSpacing;
		}
		
		const card = createCard({
			x: xOffset,
			y: yOffset,
			rotation: rotation,
			faceUp: false
		});
		
		// 플레이어가 bottom(나)인 경우 호버 효과
		if (player.position === 'bottom') {
			const originalY = yOffset;
			card.eventMode = 'static';
			card.cursor = 'pointer';
			
			card.on('pointerover', () => {
				card.y = originalY - 10;
			});
			
			card.on('pointerout', () => {
				card.y = originalY;
			});
		}
		
		handContainer.addChild(card);
	}
	
	return handContainer;
}

function createCapturedPile(player: Player): PIXI.Container {
	const pileContainer = new PIXI.Container();
	
	// 획득한 카드 더미 위치
	let xOffset = 0;
	let yOffset = -60;
	
	if (player.position === 'left') {
		xOffset = 60;
		yOffset = 0;
	} else if (player.position === 'right') {
		xOffset = -60;
		yOffset = 0;
	} else if (player.position === 'top') {
		yOffset = 60;
	}
	
	// 간단한 더미 표시
	for (let i = 0; i < Math.min(3, player.capturedCards); i++) {
		const card = createCard({
			x: xOffset + i * 2,
			y: yOffset + i * 2,
			faceUp: false
		});
		card.alpha = 0.7;
		pileContainer.addChild(card);
	}
	
	// 카드 수 표시
	const countBg = new PIXI.Graphics();
	countBg.circle(xOffset + 20, yOffset + 20, 10)
		.fill(0xFF9800);
	pileContainer.addChild(countBg);
	
	const countText = new PIXI.Text({
		text: player.capturedCards.toString(),
		style: {
			fontSize: 10,
			fill: 0xffffff
		}
	});
	countText.anchor.set(0.5);
	countText.x = xOffset + 20;
	countText.y = yOffset + 20;
	pileContainer.addChild(countText);
	
	return pileContainer;
}