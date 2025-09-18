/**
 * 화투 카드 모델
 * 각 월(月)별로 4장의 카드가 있으며, 카드마다 고유한 역할이 있습니다.
 */

export enum CardType {
	// 1월: 송학 (소나무와 두루미)
	Pine1 = '1-1',
	Pine2 = '1-2',
	PineRibbon = '1-3',  // 홍단
	PineBright = '1-4',  // 송학 (광)
	
	// 2월: 매조 (매화와 휘파람새)
	Plum1 = '2-1',
	Plum2 = '2-2',
	PlumRibbon = '2-3',  // 홍단
	PlumBird = '2-4',    // 휘파람새 (열끗)
	
	// 3월: 벚꽃
	Cherry1 = '3-1',
	Cherry2 = '3-2',
	CherryRibbon = '3-3',  // 홍단
	CherryBright = '3-4',  // 벚꽃 (광)
	
	// 4월: 흑싸리 (등나무)
	Wisteria1 = '4-1',
	Wisteria2 = '4-2',
	WisteriaRibbon = '4-3',  // 초단
	WisteriaCuckoo = '4-4',  // 두견새 (열끗)
	
	// 5월: 난초 (창포)
	Iris1 = '5-1',
	Iris2 = '5-2',
	IrisRibbon = '5-3',  // 초단
	IrisBridge = '5-4',  // 다리
	
	// 6월: 모란
	Peony1 = '6-1',
	Peony2 = '6-2',
	PeonyRibbon = '6-3',  // 청단
	PeonyButterfly = '6-4',  // 나비
	
	// 7월: 홍싸리
	BushClover1 = '7-1',
	BushClover2 = '7-2',
	BushCloverRibbon = '7-3',  // 초단
	BushCloverBoar = '7-4',    // 멧돼지 (열끗)
	
	// 8월: 공산 (억새)
	Pampas1 = '8-1',
	Pampas2 = '8-2',
	PampasBird = '8-3',     // 기러기 (열끗)
	PampasBright = '8-4',   // 달 (광)
	
	// 9월: 국화
	Chrysanthemum1 = '9-1',
	Chrysanthemum2 = '9-2',
	ChrysanthemumRibbon = '9-3',  // 청단
	ChrysanthemumCup = '9-4',      // 술잔
	
	// 10월: 단풍
	Maple1 = '10-1',
	Maple2 = '10-2',
	MapleRibbon = '10-3',  // 청단
	MapleDeer = '10-4',    // 사슴 (열끗)
	
	// 11월: 오동 (똥)
	Paulownia1 = '11-1',
	PaulowniaDouble = '11-2',  // 쌍피
	Paulownia3 = '11-3',
	PaulowniaBright = '11-4',  // 봉황 (광)
	
	// 12월: 비 (버들)
	Willow1 = '12-1',
	WillowRibbon = '12-2',   // 초단
	WillowBird = '12-3',     // 제비 (열끗)
	WillowDouble = '12-4',   // 쌍피
	WillowBright = '12-5',   // 비 (광)
}

export interface Card {
	type: CardType;
	month: number;
	index: number;  // 1-4 (스프라이트시트 위치)
	name: string;
	koreanName: string;
	category: CardCategory;
	points: number;
}

export enum CardCategory {
	BRIGHT = 'bright',     // 광 (20점)
	ANIMAL = 'animal',     // 열끗 (10점)
	RIBBON = 'ribbon',     // 띠 (5점)
	PLAIN = 'plain',       // 피 (1점)
	DOUBLE = 'double',     // 쌍피 (2점)
}

export class CardModel {
	private static cards: Map<CardType, Card> = new Map();
	
	static {
		// 1월 카드
		this.register(CardType.Pine1, 1, 1, 'Pine', '송학 피', CardCategory.PLAIN, 1);
		this.register(CardType.Pine2, 1, 2, 'Pine', '송학 피', CardCategory.PLAIN, 1);
		this.register(CardType.PineRibbon, 1, 3, 'Pine Ribbon', '송학 홍단', CardCategory.RIBBON, 5);
		this.register(CardType.PineBright, 1, 4, 'Pine Bright', '송학광', CardCategory.BRIGHT, 20);
		
		// 2월 카드
		this.register(CardType.Plum1, 2, 1, 'Plum', '매조 피', CardCategory.PLAIN, 1);
		this.register(CardType.Plum2, 2, 2, 'Plum', '매조 피', CardCategory.PLAIN, 1);
		this.register(CardType.PlumRibbon, 2, 3, 'Plum Ribbon', '매조 홍단', CardCategory.RIBBON, 5);
		this.register(CardType.PlumBird, 2, 4, 'Plum Bird', '매조', CardCategory.ANIMAL, 10);
		
		// 3월 카드
		this.register(CardType.Cherry1, 3, 1, 'Cherry', '벚꽃 피', CardCategory.PLAIN, 1);
		this.register(CardType.Cherry2, 3, 2, 'Cherry', '벚꽃 피', CardCategory.PLAIN, 1);
		this.register(CardType.CherryRibbon, 3, 3, 'Cherry Ribbon', '벚꽃 홍단', CardCategory.RIBBON, 5);
		this.register(CardType.CherryBright, 3, 4, 'Cherry Bright', '벚꽃광', CardCategory.BRIGHT, 20);
		
		// 4월 카드
		this.register(CardType.Wisteria1, 4, 1, 'Wisteria', '흑싸리 피', CardCategory.PLAIN, 1);
		this.register(CardType.Wisteria2, 4, 2, 'Wisteria', '흑싸리 피', CardCategory.PLAIN, 1);
		this.register(CardType.WisteriaRibbon, 4, 3, 'Wisteria Ribbon', '흑싸리 초단', CardCategory.RIBBON, 5);
		this.register(CardType.WisteriaCuckoo, 4, 4, 'Cuckoo', '두견새', CardCategory.ANIMAL, 10);
		
		// 5월 카드
		this.register(CardType.Iris1, 5, 1, 'Iris', '난초 피', CardCategory.PLAIN, 1);
		this.register(CardType.Iris2, 5, 2, 'Iris', '난초 피', CardCategory.PLAIN, 1);
		this.register(CardType.IrisRibbon, 5, 3, 'Iris Ribbon', '난초 초단', CardCategory.RIBBON, 5);
		this.register(CardType.IrisBridge, 5, 4, 'Bridge', '다리', CardCategory.PLAIN, 1);
		
		// 6월 카드
		this.register(CardType.Peony1, 6, 1, 'Peony', '모란 피', CardCategory.PLAIN, 1);
		this.register(CardType.Peony2, 6, 2, 'Peony', '모란 피', CardCategory.PLAIN, 1);
		this.register(CardType.PeonyRibbon, 6, 3, 'Peony Ribbon', '모란 청단', CardCategory.RIBBON, 5);
		this.register(CardType.PeonyButterfly, 6, 4, 'Butterfly', '나비', CardCategory.ANIMAL, 10);
		
		// 7월 카드
		this.register(CardType.BushClover1, 7, 1, 'Bush Clover', '홍싸리 피', CardCategory.PLAIN, 1);
		this.register(CardType.BushClover2, 7, 2, 'Bush Clover', '홍싸리 피', CardCategory.PLAIN, 1);
		this.register(CardType.BushCloverRibbon, 7, 3, 'Bush Clover Ribbon', '홍싸리 초단', CardCategory.RIBBON, 5);
		this.register(CardType.BushCloverBoar, 7, 4, 'Boar', '멧돼지', CardCategory.ANIMAL, 10);
		
		// 8월 카드
		this.register(CardType.Pampas1, 8, 1, 'Pampas', '공산 피', CardCategory.PLAIN, 1);
		this.register(CardType.Pampas2, 8, 2, 'Pampas', '공산 피', CardCategory.PLAIN, 1);
		this.register(CardType.PampasBird, 8, 3, 'Geese', '기러기', CardCategory.ANIMAL, 10);
		this.register(CardType.PampasBright, 8, 4, 'Moon', '공산광', CardCategory.BRIGHT, 20);
		
		// 9월 카드
		this.register(CardType.Chrysanthemum1, 9, 1, 'Chrysanthemum', '국화 피', CardCategory.PLAIN, 1);
		this.register(CardType.Chrysanthemum2, 9, 2, 'Chrysanthemum', '국화 피', CardCategory.PLAIN, 1);
		this.register(CardType.ChrysanthemumRibbon, 9, 3, 'Chrysanthemum Ribbon', '국화 청단', CardCategory.RIBBON, 5);
		this.register(CardType.ChrysanthemumCup, 9, 4, 'Sake Cup', '국화 술잔', CardCategory.ANIMAL, 10);
		
		// 10월 카드
		this.register(CardType.Maple1, 10, 1, 'Maple', '단풍 피', CardCategory.PLAIN, 1);
		this.register(CardType.Maple2, 10, 2, 'Maple', '단풍 피', CardCategory.PLAIN, 1);
		this.register(CardType.MapleRibbon, 10, 3, 'Maple Ribbon', '단풍 청단', CardCategory.RIBBON, 5);
		this.register(CardType.MapleDeer, 10, 4, 'Deer', '사슴', CardCategory.ANIMAL, 10);
		
		// 11월 카드
		this.register(CardType.Paulownia1, 11, 1, 'Paulownia', '오동 피', CardCategory.PLAIN, 1);
		this.register(CardType.PaulowniaDouble, 11, 2, 'Paulownia Double', '오동 쌍피', CardCategory.DOUBLE, 2);
		this.register(CardType.Paulownia3, 11, 3, 'Paulownia', '오동 피', CardCategory.PLAIN, 1);
		this.register(CardType.PaulowniaBright, 11, 4, 'Phoenix', '오동광', CardCategory.BRIGHT, 20);
		
		// 12월 카드  
		this.register(CardType.Willow1, 12, 1, 'Willow', '비 피', CardCategory.PLAIN, 1);
		this.register(CardType.WillowRibbon, 12, 2, 'Willow Ribbon', '비 초단', CardCategory.RIBBON, 5);
		this.register(CardType.WillowBird, 12, 3, 'Swallow', '제비', CardCategory.ANIMAL, 10);
		this.register(CardType.WillowDouble, 12, 4, 'Willow Double', '비 쌍피', CardCategory.DOUBLE, 2);
		// 12월은 비광이 별도로 있음 (스프라이트시트 구조에 따라 조정 필요)
	}
	
	private static register(
		type: CardType,
		month: number,
		index: number,
		name: string,
		koreanName: string,
		category: CardCategory,
		points: number
	) {
		this.cards.set(type, {
			type,
			month,
			index,
			name,
			koreanName,
			category,
			points
		});
	}
	
	static getCard(type: CardType): Card | undefined {
		return this.cards.get(type);
	}
	
	static getCardByMonthIndex(month: number, index: number): Card | undefined {
		for (const card of this.cards.values()) {
			if (card.month === month && card.index === index) {
				return card;
			}
		}
		return undefined;
	}
	
	static isBright(type: CardType): boolean {
		const card = this.getCard(type);
		return card?.category === CardCategory.BRIGHT;
	}
	
	static isAnimal(type: CardType): boolean {
		const card = this.getCard(type);
		return card?.category === CardCategory.ANIMAL;
	}
	
	static isRibbon(type: CardType): boolean {
		const card = this.getCard(type);
		return card?.category === CardCategory.RIBBON;
	}
	
	static getGodori(): CardType[] {
		// 고도리 (2월 매조, 8월 기러기, 12월 제비)
		return [CardType.PlumBird, CardType.PampasBird, CardType.WillowBird];
	}
	
	static getHongdan(): CardType[] {
		// 홍단 (1월, 2월, 3월)
		return [CardType.PineRibbon, CardType.PlumRibbon, CardType.CherryRibbon];
	}
	
	static getCheongdan(): CardType[] {
		// 청단 (6월, 9월, 10월)
		return [CardType.PeonyRibbon, CardType.ChrysanthemumRibbon, CardType.MapleRibbon];
	}
	
	static getChodan(): CardType[] {
		// 초단 (4월, 5월, 7월, 12월)
		return [CardType.WisteriaRibbon, CardType.IrisRibbon, CardType.BushCloverRibbon, CardType.WillowRibbon];
	}
}