export async function GET(request) {
	const targetUrl = 'https://bhb-cosmetic.onrender.com/api/storefront/products?limit=1';
	const startedAt = new Date().toISOString();
	console.log('[ping] incoming request', {
		startedAt,
		method: request?.method,
		url: request?.url,
	});
	try {
		const upstreamResponse = await fetch(targetUrl, { cache: 'no-store' });
		const cloneForLog = upstreamResponse.clone();
		const bodyText = await cloneForLog.text();
		console.log('[ping] fetched reply', {
			finishedAt: new Date().toISOString(),
			status: upstreamResponse.status,
			ok: upstreamResponse.ok,
			length: bodyText?.length ?? 0,
			preview: typeof bodyText === 'string' ? bodyText.slice(0, 500) : undefined,
		});
		return new Response(upstreamResponse.body, {
			status: upstreamResponse.status,
			headers: {
				'content-type': upstreamResponse.headers.get('content-type') ?? 'application/json',
				'x-proxied-by': 'keepalive',
			},
		});
	} catch (error) {
		console.error('[ping] error', {
			at: new Date().toISOString(),
			message: error?.message ?? 'Unknown error',
		});
		return new Response(
			JSON.stringify({ ok: false, error: error?.message ?? 'Unknown error' }),
			{ status: 502, headers: { 'content-type': 'application/json' } }
		);
	}
}
