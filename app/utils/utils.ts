
/**
 * 根据指定类型获取值
 * @param val 修改类型的值
 */
export function convert<T>(val: any): T {
	let res: any = null;
	try {
		res = <T>val
	} catch(e) {
		console.error();
	}
	return res;
}