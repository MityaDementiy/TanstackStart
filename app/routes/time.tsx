import { createFileRoute, useRouter, Link } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/start';

const getCurrentTime = createServerFn().handler(() => new Date().toLocaleTimeString());

export const Route = createFileRoute('/time')({
  component: Time,
  loader: async () => await getCurrentTime(),
});

function Time() {
  const router = useRouter();
  const state = Route.useLoaderData();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <p>The current time is: {state}</p>
      <button
        type="button"
        onClick={() => {
          router.invalidate();
        }}
      >
        Refresh
      </button>
      <Link to="/">Go Home</Link>
    </div>
  );
};