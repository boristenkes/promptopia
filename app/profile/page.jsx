'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';

export default function MyProfile() {
	const router = useRouter();
	const { data: session } = useSession();
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		if (session?.user.id) {
			(async () => {
				const res = await fetch(`/api/users/${session?.user.id}/posts`);
				const data = await res.json();
				setPosts(data);
			})();
		}
	}, []);

	return (
		<Profile
			name='My'
			desc='Welcome to your personalized profile page'
			data={posts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
}
