<script lang="ts">
	import { mockGameRooms } from '$lib/data/mockGames';
	
	function getStatusText(status: string) {
		switch(status) {
			case 'waiting': return '대기중';
			case 'playing': return '게임중';
			case 'finished': return '종료됨';
			default: return status;
		}
	}
	
	function getStatusClass(status: string) {
		switch(status) {
			case 'waiting': return 'bg-gray-100 text-gray-700';
			case 'playing': return 'bg-gray-100 text-gray-500';
			case 'finished': return 'bg-gray-100 text-gray-400';
			default: return 'bg-gray-100 text-gray-600';
		}
	}
	
	function joinGame(id: string) {
		console.log(`Joining game ${id}`);
	}
</script>

<div class="max-w-7xl mx-auto p-8">
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each mockGameRooms as room}
			<div class="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
				<div class="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
					<h3 class="text-lg font-medium text-gray-900">{room.name}</h3>
					<span class="text-sm px-3 py-1 rounded-full {getStatusClass(room.status)}">
						{getStatusText(room.status)}
					</span>
				</div>
				
				<div class="space-y-2 mb-4">
					<p class="text-sm text-gray-600">
						<span class="font-medium">방장:</span> {room.host}
					</p>
					<p class="text-sm text-gray-600">
						<span class="font-medium">참가자:</span> {room.players}/{room.maxPlayers}명
					</p>
					<p class="text-sm text-gray-600">
						<span class="font-medium">판돈:</span> {room.stake.toLocaleString()}원
					</p>
				</div>
				
				<button 
					class="w-full py-2.5 px-4 rounded-lg font-medium transition-colors
						{room.status !== 'waiting' || room.players >= room.maxPlayers 
							? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
							: 'bg-gray-900 text-white hover:bg-gray-800'}"
					disabled={room.status !== 'waiting' || room.players >= room.maxPlayers}
					on:click={() => joinGame(room.id)}
				>
					{#if room.status === 'playing'}
						게임중
					{:else if room.players >= room.maxPlayers}
						만석
					{:else}
						참가하기
					{/if}
				</button>
			</div>
		{/each}
	</div>
</div>