/**
 * 选择排序
 * @param {Array} data  
 */
export function dataSort(data) {
	let flag;
	for (let i = 0; i < data.length - 1; i++) {
		for (let j = i + 1; j < data.length; j++) {
			if (data[i].storage > data[j].storage) {
				// 交换
				// flag = { ...data[j] };
				// data[j] = { ...data[i] };
				// data[i] = { ...flag };
				flag = data[j]
				data[j] = data[i]
				data[i] = flag
			}
		}
	}
	return [...data];
}