import * as PIXI from 'pixi.js';
import cardSheetUrl from '$lib/assets/allcard.png';
import { CardModel, CardType, type Card } from '$lib/models/card';

export class TextureManager {
	private static instance: TextureManager;
	private cardTextures: Map<string, PIXI.Texture> = new Map();
	private baseTexture: PIXI.Texture | null = null;
	
	// 카드 크기 (스프라이트 시트 기준)
	private readonly SHEET_WIDTH = 186;
	private readonly SHEET_HEIGHT = 870;
	private readonly CARD_WIDTH = 46.5;  // 186 / 4
	private readonly CARD_HEIGHT = 72.5; // 870 / 12
	private readonly COLS = 4;
	private readonly ROWS = 12;
	
	private constructor() {}
	
	static getInstance(): TextureManager {
		if (!TextureManager.instance) {
			TextureManager.instance = new TextureManager();
		}
		return TextureManager.instance;
	}
	
	async loadTextures(): Promise<void> {
		// 스프라이트 시트 로드
		this.baseTexture = await PIXI.Assets.load(cardSheetUrl);
		
		if (!this.baseTexture || !this.baseTexture.source) {
			throw new Error('Failed to load card sprite sheet');
		}
		
		// 각 카드별 텍스처 생성 (정확한 픽셀 단위로)
		for (let month = 1; month <= 12; month++) {
			for (let card = 1; card <= 4; card++) {
				const col = card - 1;
				const row = month - 1;
				
				// 정확한 픽셀 위치 계산
				const x = col * this.CARD_WIDTH;
				const y = row * this.CARD_HEIGHT;
				
				const texture = new PIXI.Texture({
					source: this.baseTexture.source,
					frame: new PIXI.Rectangle(
						Math.round(x), 
						Math.round(y), 
						Math.floor(this.CARD_WIDTH), 
						Math.floor(this.CARD_HEIGHT)
					)
				});
				
				const key = `${month}-${card}`;
				this.cardTextures.set(key, texture);
			}
		}
		
		// 카드 뒷면 텍스처 (첫 번째 카드 위치 사용)
		const backTexture = new PIXI.Texture({
			source: this.baseTexture.source,
			frame: new PIXI.Rectangle(0, 0, this.CARD_WIDTH, this.CARD_HEIGHT)
		});
		this.cardTextures.set('back', backTexture);
	}
	
	getCardTexture(month: number, cardNum: number): PIXI.Texture | undefined {
		return this.cardTextures.get(`${month}-${cardNum}`);
	}
	
	getCardTextureByType(type: CardType): PIXI.Texture | undefined {
		const card = CardModel.getCard(type);
		if (!card) return undefined;
		return this.getCardTexture(card.month, card.index);
	}
	
	getBackTexture(): PIXI.Texture | undefined {
		return this.cardTextures.get('back');
	}
	
	getCardSize() {
		return {
			width: this.CARD_WIDTH,
			height: this.CARD_HEIGHT
		};
	}
	
	isLoaded(): boolean {
		return this.baseTexture !== null;
	}
}