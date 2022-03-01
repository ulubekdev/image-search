const token = '5252467693:AAF3JAe1jklE2Y-uChridFXiouLFbPRDYm4';

async function getUpdates() {
    let response = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);
    let datas = await response.json();

    let text = datas.result[datas.result.length - 1].message.text;
    let id = datas.result[datas.result.length - 1].message.chat.id;

    if(text === 'Salom' || text === 'salom' || text === '/start') {
        return sendMessage(id, 'Salom, iltimos rasm nomini kiriting');
    }

    let api = await fetch(`https://pixabay.com/api/?key=25942842-f39b39c97ec778185243197bc&q=${text}&image_type=photo`);

    api = await api.json();
    
    let keys = Object.keys(api.hits);
    let random = Math.floor(Math.random() * keys.length);
    let photo = api.hits[keys[random]].webformatURL;
    
    return [id, photo];
}
async function sendPhoto(data) {
    let [id, photo] = await data;
    let response = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: id,
            photo
        })
    });
}
async function sendMessage(id, text) {
    let response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: id,
            text
        })
    });
}
sendPhoto(getUpdates().then(data => data));