import id3 from 'id3js';

export default function readTags(file) {
	return new Promise((resolve, reject) => {
		id3(file, function (err, tags) {
			if (err)
				reject(err);
			else
				resolve(tags);
		});
	});
}