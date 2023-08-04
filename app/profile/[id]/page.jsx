'use client';

import Profile from '@components/Profile';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ProfilePage({ params }) {
	const searchParams = useSearchParams();
	const userName = searchParams.get('name');
	const [userPosts, setUserPosts] = useState([]);
	const router = useRouter();
	const { data: session } = useSession();

	const name = fallback => {
		return session?.user.name.replaceAll(' ', '').toLowerCase() === userName
			? fallback
			: userName + `'${!userName.endsWith('s') ? 's' : ''}`;
	};

	const handleEdit = post => router.push(`/update-prompt?id=${post._id}`);

	const handleDelete = async post => {
		const confirmed = confirm(
			'Are you sure you want to permamently delete this prompt?'
		);
		if (!confirmed) return;

		try {
			await fetch(`../api/prompt/${String(post._id)}`, {
				method: 'DELETE'
			});

			const filteredPosts = userPosts.filter(p => p._id !== post._id);
			setUserPosts(filteredPosts);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (params.id) {
			(async () => {
				const res = await fetch(`/api/users/${params.id}/posts`);
				const data = await res.json();
				setUserPosts(data);
			})();
		}
	}, [params.id]);

	return (
		<Profile
			name={name('My')}
			desc={`Welcome to ${name('your')} personalized profile page`}
			data={userPosts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
}
