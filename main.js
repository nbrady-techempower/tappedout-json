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
  
  json.url = document.URL;
  
  json.author = '';
  document.querySelector('.well-jumbotron').querySelectorAll('p')[1].querySelectorAll('a').forEach(a => json.author += a.innerHTML.trim());
  
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
		const type = (li.querySelector('span').className.match(/card-type-([a-z]*)/) || ["",""])[1];
	
		json.cards.push({ name: orig, category, qty, color, type });
	  });
	});
  
  // Open the JSON output in a new tab
  const newTab = window.open();
  const pre = document.createElement('pre');
  pre.append(document.createTextNode(JSON.stringify(json, null, 2)));
  newTab.document.querySelector('body').append(pre);
}

jsonBtnDiv.addEventListener("click", jsonify, false);


