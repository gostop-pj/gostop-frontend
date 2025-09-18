export interface GameRoom {
	id: string;
	name: string;
	host: string;
	players: number;
	maxPlayers: number;
	status: 'waiting' | 'playing' | 'finished';
	stake: number;
}

export const mockGameRooms: GameRoom[] = [
	{
		id: '1',
		name: '초보자 환영',
		host: '김고수',
		players: 2,
		maxPlayers: 3,
		status: 'waiting',
		stake: 1000
	},
	{
		id: '2',
		name: '3점 고스톱',
		host: '박달인',
		players: 3,
		maxPlayers: 3,
		status: 'playing',
		stake: 5000
	},
	{
		id: '3',
		name: '친선 게임',
		host: '이초보',
		players: 1,
		maxPlayers: 3,
		status: 'waiting',
		stake: 2000
	},
	{
		id: '4',
		name: '빠른 게임',
		host: '최고수',
		players: 2,
		maxPlayers: 2,
		status: 'playing',
		stake: 10000
	},
	{
		id: '5',
		name: '느긋한 게임',
		host: '정여유',
		players: 1,
		maxPlayers: 3,
		status: 'waiting',
		stake: 3000
	}
];