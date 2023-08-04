'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';

export default function MyProfile() {
	const router = useRouter();
	const { data: session } = useSession();
	const [posts, setPosts] = useState([]);

	const handleEdit = post => router.push(`/update-prompt?id=${post._id}`);

	const handleDelete = async post => {
		const confirmed = confirm(
			'Are you sure you want to permamently delete this prompt?'
		);
		if (!confirmed) return;

		try {
			await fetch(`api/prompt/${String(post._id)}`, {
				method: 'DELETE'
			});

			const filteredPosts = posts.filter(p => p._id !== post._id);
			setPosts(filteredPosts);
		} catch (error) {
			console.error(error);
		}
	};

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
