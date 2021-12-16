// variável global
var form = document.querySelector('.eosrvalidator');

// objeto de funções para validar o formulário
var eosrValidator =
{
	handleSubmit: (event) =>
    {
        // parar evento de submit, não enviando os dados caso os mesmos não sejam válidos
		event.preventDefault();
		let send = true;
		let inputs = form.querySelectorAll('input');
		
        eosrValidator.clearErrors();

        for (let i = 0; i < inputs.length; i++)
        {
			let input = inputs[i];
			let check = eosrValidator.checkInput(input);
			if (check !== true)
            {
				send = false;
			    eosrValidator.showError(input, check);
			}
		}

		if (send)
        {
			form.submit();
		}
	},

	checkInput: (input) => {
		let rules = input.getAttribute('data-rules');
		if (rules !== null) {
			rules = rules.split('|');
			for (let r in rules)
            {
				// obtém uma lista com o nome do atributo e o valor
                let el = rules[r].split('=');
				// validação conforme o nome do atributo
                switch (el[0])
                {
					case 'required':
						if (input.value == '')
                        {
							return 'Campo obrigatório';
						}
						break;
					case 'min':
                        if (input.value.length < el[1])
                        {
                            return `O campo deve conter pelo menos ${el[1]} caracteres`;
                        }
						break;
                    case 'email':
                        if (input.value !== '')
                        {
                            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                            if(!regex.test(input.value.toLowerCase()))
                            {
                                return 'Formato de e-mail inválido';
                            }
                        }
                        break;
				}
			}
		}
		return true;
	},

    showError: (input, message) =>
    {
        // altera a cor da borda do elemento
        input.style.borderColor = 'darkred';
        
        // criar uma div para exibir a mensagem de erro no formulário
        let divError = document.createElement('div');
        divError.classList.add('error');
        divError.innerHTML = '';
        divError.innerHTML = message;

        // insere a mensagem de erro abaixo do input
        // input.parentElement.insertBefore(divError, input.nextElementSibling);

        // insere a mensagem de erro acima do input
        input.parentElement.insertBefore(divError, input);
    },

    clearErrors: () =>
    {
        let divError = document.querySelectorAll('.error');
        for (let i = 0; i < divError.length; i++)
        {
            divError[i].remove();
        }

        let divInput = form.querySelectorAll('input');
        for (let i = 0; i < divInput.length; i++)
        {
            divInput[i].style = '';
        }
    }
};

// chamada do validador do formulário
form.addEventListener('submit', eosrValidator.handleSubmit);