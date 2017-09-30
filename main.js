const body = document.querySelector('body');
const main = document.querySelector('#main-content');

const jsonBtnHtml = `
<div class="json-button btn btn-info" style="
    position: fixed;
    z-index: 100;
    bottom: 20px;
    right: 20px;
    font-size: 20;
">
	Export as JSON
</div>
`;

const jsonBtnDiv = document.createElement('div');
jsonBtnDiv.innerHTML = jsonBtnHtml;

const jsonTextField = document.createElement('div');

main.append(jsonBtnDiv, jsonTextField);

const jsonify = () => {
	
  const json = {};
  
  json.name = document.querySelector('.well-jumbotron').querySelector('h2').innerHTML.trim();
  
  json.tags = [];
  document.querySelector('.well-jumbotron').querySelector('p').querySelectorAll('a').forEach(a => json.tags.push(a.innerHTML.trim()));
	
  json.cards = [];  

  // Get all of the board lists
  document.querySelectorAll('.boardlist')
    .forEach(b => { 
	  b.querySelectorAll('li').forEach(li => {
        // Pull off the attributes we care about
		if (!li.querySelector('a')) return;
        const dataSet = li.querySelector('a').dataset;
	    const { orig, category, qty } = dataSet;
		const color = (li.querySelector('span').className.match(/card-color-([a-z]*)/) || ["",""])[1];
	
		json.cards.push({ name: orig, category, qty, color });
	  });
	});
  
  body.innerHTML = JSON.stringify(json);
  body.style.backgroundImage = 'none';
  body.style.color = 'black';
}

jsonBtnDiv.addEventListener("click", jsonify, false);


