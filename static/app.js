class Chatbox{

	constructor(){
		this.args={
			openButton:document.querySelector('.chatbox__button'),
			chatBox:document.querySelector('.chatbox__support'),
			sendButton:document.querySelector('.send__button')
		}

		this.state = false;
		this.message=[];
	}

	display(){
		const {openButton,chatBox,sendButton} = this.args;

		openButton.addEventLister('click',() => this.toggleState(chatBox))

		sendButton.addEventLister('click',() => this.onSendButton(chatBox))

		const node =chatBox.querySelector('input');
		node.addEventLister("keyup",({key}) => {
			if (key === "Enter"){
				this.onSendButton(chatBox)
			}
		})
	}


	toggleState(chatbox){
		this.state=!this.state;

		if(this.state){
			chatbox.classList.add('chatbox--active')
		}else{
			chatbox.classList.remove('chat--active')
		}
	}


	onSendButton(chatbox){
		var textFeild =chatbox.querySelector('input');
		let text1 =textFeild.value
		if (text1 === " "){
			return;
		}

		let msg1={name:"User",message:text1}
		this.messages.push(msg1);

		//'http://127.0.0.1:5000/predit'
		fetch($SCRIPT_ROOT)+'/predit',{
			method:'POST',
		    body:JSON.stringify({message:text1}),
		    mode:'cors',
		    heders:{
		    	'Content-Type':'application/json'
		    },
		})
		.then(r => r.json())
		.then(r => {
			let msg2 = {name:"Sam",message:r.answer};
			this.messages.push(msg2);
			this.updateChattext(chatbox)
			textFeild.value=''

		}).catch((error)) => {
			console.error('Error:',error);
			this.updateChattext(chatbox)
			textFeild.value=''
		})

	}
	updateChattext(chatbox){
		var html = '';
		this.messages.slice().reverse().forEach(function(item,number){
			if (item.name === "Sam")
			{
				html += '<div class="messages__item messages__item--visitor">'+item.message+'</div>'
			}
			else
			{
				html += '<div class="messages__item messages__item--operator">'+item.message+'</div>'
			}
		});

		const chatmessage = chatbox.querySelector('.chatbox__messages');
		chatmessage.innerHTML = html;
	}


}

const chatbox =new Chatbox();
chatbox.display();