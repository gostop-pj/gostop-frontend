<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	
	onMount(() => {
		goto('/games');
	});
</script>

<div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
	<p>게임 목록으로 이동중...</p>
</div>
