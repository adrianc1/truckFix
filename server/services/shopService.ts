import prisma from '../db';

const getAllShops = async () => {
	try {
		const shops = await prisma.shop.findMany({
			where: { status: 'verified' },
			select: {
				id: true,
				name: true,
				lat: true,
				lng: true,
				formattedAddress: true,
			},
		});
		return shops;
	} catch (error) {
		console.error('Error fetching shops:', error);
		throw new Error('Internal server error');
	}
};

export { getAllShops };
