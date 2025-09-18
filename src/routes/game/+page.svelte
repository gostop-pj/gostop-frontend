<script lang="ts">
	import { onMount } from 'svelte';
	import * as PIXI from 'pixi.js';
	import { createCard, createCardStack } from '$lib/game/cardHelpers';
	import { createPlayerArea, type Player } from '$lib/game/playerHelpers';
	import { TextureManager } from '$lib/game/textureManager';
	import { CardType } from '$lib/models/card';
	
	let container: HTMLDivElement;
	let app: PIXI.Application;
	let handleResize: () => void;
	
	// 샘플 플레이어 데이터
	const players: Player[] = [
		{ id: '1', name: '나', position: 'bottom', cards: 10, capturedCards: 5, score: 12 },
		{ id: '2', name: '상대1', position: 'top', cards: 10, capturedCards: 3, score: 8 },
		{ id: '3', name: '상대2', position: 'left', cards: 10, capturedCards: 7, score: 15 },
		{ id: '4', name: '상대3', position: 'right', cards: 10, capturedCards: 2, score: 5 }
	];
	
	// 테이블 위의 오픈된 카드들 (샘플) - CardType 사용
	const tableCards = [
		CardType.PineBright,      // 1월 송학광
		CardType.PlumBird,        // 2월 매조
		CardType.CherryBright,    // 3월 벚꽃광
		CardType.WisteriaRibbon,  // 4월 초단
		CardType.Iris1,           // 5월 난초 피
		CardType.PeonyButterfly,  // 6월 나비
		CardType.BushCloverBoar,  // 7월 멧돼지
		CardType.PampasBright     // 8월 공산광 (달)
	];
	
	onMount(() => {
		(async () => {
		// 텍스처 매니저 초기화
		const textureManager = TextureManager.getInstance();
		await textureManager.loadTextures();
		
		// PixiJS 앱 생성 (WebGL 렌더링)
		app = new PIXI.Application();
		await app.init({
			width: window.innerWidth - 256,
			height: window.innerHeight,
			background: 0xf5f5f5,
			antialias: true,
			resolution: window.devicePixelRatio || 1,
			autoDensity: true
		});
		
		container.appendChild(app.canvas);
		
		const stageWidth = app.screen.width;
		const stageHeight = app.screen.height;
		const centerX = stageWidth / 2;
		const centerY = stageHeight / 2;
		
		// 게임판 영역
		const playArea = new PIXI.Graphics();
		playArea.circle(centerX, centerY, 250)
			.fill(0xffffff)
			.stroke({ width: 1, color: 0xe8e8e8 });
		app.stage.addChild(playArea);
		
		// 내부 원 (장식)
		const innerCircle = new PIXI.Graphics();
		innerCircle.circle(centerX, centerY, 150)
			.stroke({ width: 1, color: 0xf0f0f0 });
		app.stage.addChild(innerCircle);
		
		// 중앙 카드 더미 (주석 처리된 부분 제거)
		const cardStack = createCardStack(centerX, centerY - 50, 15);
		app.stage.addChild(cardStack);
		
		// 테이블 위 오픈된 카드들
		const tableCardsContainer = new PIXI.Container();
		
		tableCards.forEach((cardType, index) => {
			const angle = (index / tableCards.length) * Math.PI * 2;
			const radius = 120;
			const x = centerX + Math.cos(angle) * radius;
			const y = centerY + Math.sin(angle) * radius;
			const rotation = (Math.random() - 0.5) * 20;
			
			const card = createCard({
				x,
				y,
				rotation,
				faceUp: true,
				cardType: cardType
			});
			
			// 호버 효과
			card.on('pointerover', () => {
				card.scale.set(1.1);
			});
			
			card.on('pointerout', () => {
				card.scale.set(1);
			});
			
			tableCardsContainer.addChild(card);
		});
		
		app.stage.addChild(tableCardsContainer);
		
		// 플레이어 영역들 추가
		players.forEach(player => {
			const playerArea = createPlayerArea({
				player,
				stageWidth,
				stageHeight
			});
			app.stage.addChild(playerArea);
		});
		
		// 윈도우 리사이즈 처리
		handleResize = () => {
			const newWidth = window.innerWidth - 256;
			const newHeight = window.innerHeight;
			
			app.renderer.resize(newWidth, newHeight);
			
			// 배경 재그리기
			playArea.clear();
			playArea.circle(newWidth / 2, newHeight / 2, 250)
				.fill(0xffffff)
				.stroke({ width: 1, color: 0xe8e8e8 });
			
			innerCircle.clear();
			innerCircle.circle(newWidth / 2, newHeight / 2, 150)
				.stroke({ width: 1, color: 0xf0f0f0 });
		};
		
		window.addEventListener('resize', handleResize);
		
		// FPS 표시 (디버깅용)
		const fpsText = new PIXI.Text({
			text: 'FPS: 0',
			style: {
				fontSize: 12,
				fill: 0x666666
			}
		});
		fpsText.x = 10;
		fpsText.y = 10;
		app.stage.addChild(fpsText);
		
		// FPS 업데이트
		app.ticker.add(() => {
			fpsText.text = `FPS: ${Math.round(app.ticker.FPS)}`;
		});
		
		})();
		
		return () => {
			if (app) {
				window.removeEventListener('resize', handleResize);
				app.destroy(true, { children: true, texture: true });
			}
		};
	});
</script>

<div bind:this={container} class="w-full h-screen"></div>