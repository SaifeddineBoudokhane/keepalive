export const metadata = {
	title: 'Keepalive',
	description: 'Cron pinger',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body suppressHydrationWarning>{children}</body>
		</html>
	);
}
