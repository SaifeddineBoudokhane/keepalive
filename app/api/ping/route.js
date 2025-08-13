export async function GET(request) {
	const targetUrl = 'https://bhb-cosmetic.onrender.com/api/storefront/products?limit=1';
	const startedAt = new Date().toISOString();
	console.log('[ping] incoming request', {
		startedAt,
		method: request?.method,
		url: request?.url,
	});
	try {
		const response = await fetch(targetUrl, { cache: 'no-store' });
		const text = await response.text();
		console.log('[ping] fetched reply', {
			finishedAt: new Date().toISOString(),
			status: response.status,
			ok: response.ok,
			length: text?.length ?? 0,
			preview: typeof text === 'string' ? text.slice(0, 500) : undefined,
		});
		return new Response(
			JSON.stringify({ ok: response.ok, status: response.status, body: text }),
			{ status: 200, headers: { 'content-type': 'application/json' } }
		);
	} catch (error) {
		console.error('[ping] error', {
			at: new Date().toISOString(),
			message: error?.message ?? 'Unknown error',
		});
		return new Response(
			JSON.stringify({ ok: false, error: error?.message ?? 'Unknown error' }),
			{ status: 200, headers: { 'content-type': 'application/json' } }
		);
	}
}
