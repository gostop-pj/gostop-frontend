import * as PIXI from 'pixi.js';
import { TextureManager } from './textureManager';
import { CardModel, CardType, type Card } from '$lib/models/card';

// 실제 스프라이트 크기
export const SPRITE_CARD_WIDTH = 46.5;
export const SPRITE_CARD_HEIGHT = 72.5;

// 게임에서 표시할 크기 (1.5배 확대)
export const CARD_WIDTH = 70;
export const CARD_HEIGHT = 109;

interface CardOptions {
	x: number;
	y: number;
	rotation?: number;
	faceUp?: boolean;
	cardType?: CardType;
	// 하위 호환성을 위해 유지
	month?: number;
	cardNum?: number;
}

export function createCard(options: CardOptions): PIXI.Container {
	const { 
		x, 
		y, 
		rotation = 0, 
		faceUp = false, 
		cardType,
		month,
		cardNum 
	} = options;
	
	const cardContainer = new PIXI.Container();
	cardContainer.x = x;
	cardContainer.y = y;
	cardContainer.rotation = rotation * Math.PI / 180;
	
	const textureManager = TextureManager.getInstance();
	
	// 카드 그림자
	const shadow = new PIXI.Graphics();
	shadow.rect(-CARD_WIDTH/2 + 2, -CARD_HEIGHT/2 + 2, CARD_WIDTH, CARD_HEIGHT)
		.fill({ color: 0x000000, alpha: 0.2 });
	cardContainer.addChild(shadow);
	
	if (faceUp) {
		let texture: PIXI.Texture | undefined;
		let card: Card | undefined;
		
		// 새로운 CardType 방식 우선
		if (cardType) {
			texture = textureManager.getCardTextureByType(cardType);
			card = CardModel.getCard(cardType);
		} 
		// 레거시 방식 (month, cardNum)
		else if (month && cardNum) {
			texture = textureManager.getCardTexture(month, cardNum);
			card = CardModel.getCardByMonthIndex(month, cardNum);
		}
		
		if (texture) {
			const sprite = new PIXI.Sprite(texture);
			sprite.anchor.set(0.5);
			// 스프라이트를 게임 크기로 스케일 조정
			sprite.width = CARD_WIDTH;
			sprite.height = CARD_HEIGHT;
			cardContainer.addChild(sprite);
			
			// 카드 데이터 저장 (게임 로직에서 사용)
			if (card) {
				(cardContainer as any).cardData = card;
			}
		} else {
			// 텍스처가 없으면 기본 카드 표시
			createDefaultCard(cardContainer, true, month || 1, cardNum || 1);
		}
	} else {
		// 뒷면 - 전통적인 화투 뒷면 디자인
		const backCard = new PIXI.Graphics();
		backCard.rect(-CARD_WIDTH/2, -CARD_HEIGHT/2, CARD_WIDTH, CARD_HEIGHT)
			.fill(0x8B0000) // 진한 빨간색
			.stroke({ width: 1, color: 0x4B0000 });
		cardContainer.addChild(backCard);
		
		// 뒷면 패턴 - 중앙 원
		const pattern = new PIXI.Graphics();
		pattern.circle(0, 0, 20)
			.fill({ color: 0xFFD700, alpha: 0.3 }); // 금색
		cardContainer.addChild(pattern);
		
		// 모서리 장식
		const corners = new PIXI.Graphics();
		corners.rect(-CARD_WIDTH/2 + 5, -CARD_HEIGHT/2 + 5, CARD_WIDTH - 10, CARD_HEIGHT - 10)
			.stroke({ width: 1, color: 0xFFD700, alpha: 0.3 });
		cardContainer.addChild(corners);
	}
	
	// 인터랙션 설정
	cardContainer.eventMode = 'static';
	cardContainer.cursor = 'pointer';
	
	return cardContainer;
}

// 텍스처 로드 실패시 기본 카드
function createDefaultCard(container: PIXI.Container, faceUp: boolean, month: number, cardNum: number) {
	const card = new PIXI.Graphics();
	card.rect(-CARD_WIDTH/2, -CARD_HEIGHT/2, CARD_WIDTH, CARD_HEIGHT)
		.fill(0xffffff)
		.stroke({ width: 1, color: 0xd0d0d0 });
	container.addChild(card);
	
	// 월 표시
	const monthColors = [0xff6b6b, 0x4ecdc4, 0x45b7d1, 0x96ceb4, 0xffeaa7, 0xdfe6e9, 
					     0xfab1a0, 0x74b9ff, 0xa29bfe, 0xfd79a8, 0xfdcb6e, 0xe17055];
	
	const monthIndicator = new PIXI.Graphics();
	monthIndicator.rect(-CARD_WIDTH/2 + 5, -CARD_HEIGHT/2 + 5, 10, 10)
		.fill(monthColors[month - 1]);
	container.addChild(monthIndicator);
	
	// 카드 번호
	const text = new PIXI.Text({
		text: `${month}-${cardNum}`,
		style: {
			fontSize: 12,
			fill: 0x333333,
			align: 'center'
		}
	});
	text.anchor.set(0.5);
	text.y = 0;
	container.addChild(text);
}

export function createCardStack(x: number, y: number, count: number = 20): PIXI.Container {
	const stackContainer = new PIXI.Container();
	stackContainer.x = x;
	stackContainer.y = y;
	
	for (let i = 0; i < count; i++) {
		const offsetX = (Math.random() - 0.5) * 2;
		const offsetY = -i * 1.2;
		const rotation = (Math.random() - 0.5) * 2;
		const opacity = 0.3 + (i / count) * 0.7;
		
		const card = createCard({
			x: offsetX,
			y: offsetY,
			rotation,
			faceUp: false
		});
		
		card.alpha = opacity;
		stackContainer.addChild(card);
	}
	
	// 호버 효과
	stackContainer.eventMode = 'static';
	stackContainer.cursor = 'pointer';
	
	stackContainer.on('pointerover', () => {
		stackContainer.scale.set(1.05);
	});
	
	stackContainer.on('pointerout', () => {
		stackContainer.scale.set(1);
	});
	
	return stackContainer;
}

// 특정 역(combination)을 위한 카드 생성 헬퍼
export function createBrightCard(x: number, y: number, type: CardType): PIXI.Container {
	if (!CardModel.isBright(type)) {
		console.warn(`Card ${type} is not a bright card`);
	}
	return createCard({ x, y, faceUp: true, cardType: type });
}

export function createAnimalCard(x: number, y: number, type: CardType): PIXI.Container {
	if (!CardModel.isAnimal(type)) {
		console.warn(`Card ${type} is not an animal card`);
	}
	return createCard({ x, y, faceUp: true, cardType: type });
}

export function createRibbonCard(x: number, y: number, type: CardType): PIXI.Container {
	if (!CardModel.isRibbon(type)) {
		console.warn(`Card ${type} is not a ribbon card`);
	}
	return createCard({ x, y, faceUp: true, cardType: type });
}