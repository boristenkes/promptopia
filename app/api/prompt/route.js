import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export async function GET({ req }) {
	try {
		await connectToDB();

		const prompts = await Prompt.find({}).populate('creator');

		return new Response(JSON.stringify(prompts), { status: 200 });
	} catch (error) {
		console.error('Error generating prompts: ' + error.message);
		return new Response('Failed to fetch all prompts', { status: 500 });
	}
}
