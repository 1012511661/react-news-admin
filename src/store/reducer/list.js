
const listState = {
	inputValue: '',
	list: [],
};
const listReducer = (state = listState, action) => {
	let {type, value} = action;
	let _state = JSON.parse(JSON.stringify(state)); //深度拷贝state
	switch (type) {
		default:
			return state;
	}
};
export default listReducer;
