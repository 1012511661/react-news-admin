/*
 * @Author:author
 * @Date: 2021-08-02 15:46:37
 * @describe:
 */

const KEY = {
    TOKEN: 'token',
}
// sessionStorage.setItem('token','token')
export const TOKEN = {
    setValue: (value) => {
        sessionStorage.setItem(KEY.TOKEN, value);
    },
    getValue: () => {
        return sessionStorage.getItem(KEY.TOKEN);
    },
    clear: () => {
        sessionStorage.removeItem(KEY.TOKEN);
    }
};
