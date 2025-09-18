<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';

	let { children } = $props();
</script>

<div class="flex h-screen bg-gray-50">
	<nav class="w-64 bg-white border-r border-gray-200">
		<div class="p-6 border-b border-gray-200">
			<h2 class="text-2xl font-semibold text-gray-900">미니멀 고스톱</h2>
		</div>
		
		<div class="p-4">
			<a 
				href="/game" 
				class="flex items-center gap-3 px-4 py-3 mb-2 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors {$page.url.pathname === '/game' ? 'bg-gray-100 text-gray-900 font-medium' : ''}"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
					<path d="M8 12h8M12 8v8"></path>
					<rect x="4" y="4" width="16" height="16" rx="2"></rect>
				</svg>
				<span>게임판</span>
			</a>
			
			<a 
				href="/games" 
				class="flex items-center gap-3 px-4 py-3 mb-2 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors {$page.url.pathname === '/games' ? 'bg-gray-100 text-gray-900 font-medium' : ''}"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
					<rect x="3" y="3" width="7" height="7"></rect>
					<rect x="14" y="3" width="7" height="7"></rect>
					<rect x="14" y="14" width="7" height="7"></rect>
					<rect x="3" y="14" width="7" height="7"></rect>
				</svg>
				<span>게임 목록</span>
			</a>
			
			<a 
				href="/settings" 
				class="flex items-center gap-3 px-4 py-3 mb-2 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors {$page.url.pathname === '/settings' ? 'bg-gray-100 text-gray-900 font-medium' : ''}"
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
					<circle cx="12" cy="12" r="3"></circle>
					<path d="M12 1v6m0 6v6m4.22-13.22l4.24 4.24M1.54 1.54l4.24 4.24M20.46 20.46l-4.24-4.24M1.54 20.46l4.24-4.24"></path>
				</svg>
				<span>설정</span>
			</a>
		</div>
	</nav>
	
	<main class="flex-1 overflow-y-auto">
		{@render children?.()}
	</main>
</div>
