<script lang="ts">
	let nickname = '플레이어1';
	let soundEnabled = true;
	let vibrationEnabled = true;
	let autoSort = false;
	let showHints = true;
	let gameSpeed = 'normal';
	
	function saveSettings() {
		console.log('Settings saved:', {
			nickname,
			soundEnabled,
			vibrationEnabled,
			autoSort,
			showHints,
			gameSpeed
		});
	}
</script>

<div class="max-w-3xl mx-auto p-8">
	<div class="bg-white rounded-lg border border-gray-200 p-6 mb-6">
		<h2 class="text-lg font-medium text-gray-900 mb-4">프로필</h2>
		
		<div class="space-y-4">
			<div>
				<label for="nickname" class="block text-sm font-medium text-gray-700 mb-2">
					닉네임
				</label>
				<input
					id="nickname"
					type="text"
					bind:value={nickname}
					class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition"
					placeholder="게임에서 사용할 닉네임"
				/>
			</div>
		</div>
	</div>
	
	<div class="bg-white rounded-lg border border-gray-200 p-6 mb-6">
		<h2 class="text-lg font-medium text-gray-900 mb-4">게임 옵션</h2>
		
		<div class="space-y-4">
			<div class="flex items-center justify-between">
				<div>
					<label for="sound" class="text-sm font-medium text-gray-700">
						효과음
					</label>
					<p class="text-xs text-gray-500">게임 중 효과음을 재생합니다</p>
				</div>
				<button
					id="sound"
					on:click={() => soundEnabled = !soundEnabled}
					aria-label="Toggle sound effects"
					class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors {soundEnabled ? 'bg-gray-900' : 'bg-gray-200'}"
				>
					<span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform {soundEnabled ? 'translate-x-6' : 'translate-x-1'}"></span>
				</button>
			</div>
			
			<div class="flex items-center justify-between">
				<div>
					<label for="vibration" class="text-sm font-medium text-gray-700">
						진동
					</label>
					<p class="text-xs text-gray-500">중요한 이벤트 시 진동 알림</p>
				</div>
				<button
					id="vibration"
					on:click={() => vibrationEnabled = !vibrationEnabled}
					aria-label="Toggle vibration"
					class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors {vibrationEnabled ? 'bg-gray-900' : 'bg-gray-200'}"
				>
					<span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform {vibrationEnabled ? 'translate-x-6' : 'translate-x-1'}"></span>
				</button>
			</div>
			
			<div class="flex items-center justify-between">
				<div>
					<label for="autoSort" class="text-sm font-medium text-gray-700">
						자동 정렬
					</label>
					<p class="text-xs text-gray-500">패를 자동으로 정렬합니다</p>
				</div>
				<button
					id="autoSort"
					on:click={() => autoSort = !autoSort}
					aria-label="Toggle auto sort"
					class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors {autoSort ? 'bg-gray-900' : 'bg-gray-200'}"
				>
					<span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform {autoSort ? 'translate-x-6' : 'translate-x-1'}"></span>
				</button>
			</div>
			
			<div class="flex items-center justify-between">
				<div>
					<label for="hints" class="text-sm font-medium text-gray-700">
						힌트 표시
					</label>
					<p class="text-xs text-gray-500">가능한 수를 표시합니다</p>
				</div>
				<button
					id="hints"
					on:click={() => showHints = !showHints}
					aria-label="Toggle hints"
					class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors {showHints ? 'bg-gray-900' : 'bg-gray-200'}"
				>
					<span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform {showHints ? 'translate-x-6' : 'translate-x-1'}"></span>
				</button>
			</div>
			
			<div>
				<label for="speed" class="block text-sm font-medium text-gray-700 mb-2">
					게임 속도
				</label>
				<select 
					id="speed"
					bind:value={gameSpeed}
					class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition"
				>
					<option value="slow">느림</option>
					<option value="normal">보통</option>
					<option value="fast">빠름</option>
				</select>
			</div>
		</div>
	</div>
	
	<button 
		on:click={saveSettings}
		class="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
	>
		설정 저장
	</button>
</div>