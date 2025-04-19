const imageCompression = async (
	image: File,
	options: { maxSizeMB: number }
) => {
	const lib = await import('browser-image-compression')
	return await lib.default(image, options)
}

export default imageCompression
