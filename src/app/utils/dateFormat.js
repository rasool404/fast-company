export const getDateFormat = (millisec) => {
    let result = "";
    const timeDiff = Date.now() - Number(millisec);
    const date = new Date(Number(millisec));
    if (timeDiff >= 0) {
        result = " - 1 минуту назад";
    }
    if (timeDiff >= 300 * 1000) {
        result = " - 5 минут назад";
    }
    if (timeDiff >= 600 * 1000) {
        result = " - 10 минут назад";
    }
    if (timeDiff >= 1800 * 1000) {
        result = " - 30 минут назад";
    }
    if (timeDiff >= 3600 * 1000) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        result = ` - ${hours < 10 ? "0" + hours : hours}:${
            minutes < 10 ? "0" + minutes : minutes
        }`;
    }
    if (timeDiff >= 3600 * 1000 * 24) {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        result = ` - ${day < 10 ? "0" + day : day}.${
            month < 10 ? "0" + month : month
        } `;
    }
    if (new Date(Date.now()).getFullYear() - date.getFullYear() >= 1) {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        result = ` - ${day < 10 ? "0" + day : day}.${
            month < 10 ? "0" + month : month
        }.${year}`;
    }
    return result;
};
