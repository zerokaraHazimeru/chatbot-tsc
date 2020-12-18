class Bot {
    public inputText: HTMLInputElement;
    public ulElement: HTMLUListElement;

    constructor() {
        this.inputText = document.getElementById('chat-input')! as HTMLInputElement;
        this.ulElement = document.getElementById('chat-ul')! as HTMLUListElement;
    }

    output = (val: string, person: string) => {
        const field = document.getElementById('field')! as HTMLElement;

        const ul = document.getElementById('chat-ul')! as HTMLUListElement;
        const li = document.createElement('li')! as HTMLLIElement;
        const div = document.createElement('div')! as HTMLDivElement;
        div.textContent = val;

        if (person === 'me') {
            div.classList.add('chat-right');
            li.classList.add('right');
            ul.appendChild(li);
            li.appendChild(div);
            field.scrollTop = field.scrollHeight;
        } else if (person === 'robot') {
            setTimeout(() => {
                div.classList.add('chat-left');
                li.classList.add('left');
                ul.appendChild(li);
                li.appendChild(div);
                field.scrollTop = field.scrollHeight;
            }, 1000);
        }
    };

    btnFunc = (evnet: Event) => {
        event?.preventDefault();
        const inputTextValue = this.inputText.value;
        this.output(inputTextValue, 'me');
    };

    observation = () => {
        const target = document.getElementById('chat-ul')! as HTMLUListElement;
        const observer = new MutationObserver(this.robotAction);
        const option = {
            childList: true,
            // subtree: true,
        }
        observer.observe(target, option);
    }

    robotAction = () => {
            const lastElement = this.ulElement.lastElementChild;
            if (lastElement) {
                const elementName = lastElement?.className;
                if (elementName === 'right') {
                    let inputValue = this.inputText.value;
                    this.output(inputValue, 'robot');
                    this.inputText.value = '';
                } else if (elementName === 'left') {
                    console.log('robotの発話');
                }
            }
    }


}


const bot = new Bot();
const form = document.querySelector('form');
form!.addEventListener('submit', bot.btnFunc);

bot.output('hello', 'robot');
bot.observation();

