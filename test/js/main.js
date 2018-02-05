/*
 * Responsive, simple search dropdown. After two typed letters, shows partial
 * search reasults in a list blow. Using cryptocurrency public rest API.
 * Press Enter saves value in below.
 * Technology: Node, Stylus, JavaScript.
 * WAI Guidelines for accesibility aplied. 
 */

(function () {

    function startup() {
        getData() // Pending, function to cache it
        console.log('Search word examples: bitcoin, ripple, ethereum, cardano, stellar')
    }

    var input = document.getElementById('user-input')
    var list = document.getElementById('cryptoList')

    // Not used because is not supported in all browsers
    /* input.addEventListener('click', (event) => {
        toggleList()
    }) */

    // Used instead
    input.addEventListener('click', function (event) {
        toggleList()
    })

    input.addEventListener('keyup', function (event) {
        searchFunction()
        // Don't display list
        // until user types two letters.
        if (input.value.length > 1) {
            showList()
        } else {
            hideList()
        }
    })

    list.addEventListener('keydown', function (evet) {
        var target = event.target

        // Not finish. 
        // Replace for a switch case.
        if (event.key === 'ArrowDown' && target.nextElementSibling) {
            // User can use arrow down to go down in  
            // the lista to the last element only
            target.nextElementSibling.focus(true)
            console.log(target.nextElementSibling)
        }
        else if (event.key === 'ArrowUp' && target.previousElementSibling)
            // User can use arrow up to go up 
            // in the lista to the first element only
            // For now only accesible with tab key
            // Build part for finding new siblings of target 
            target.previousElementSibling.focus(true)
        else if (event.key === 'Enter') {
            // Enter event in lista element
            var target = event.target
            var enterLog = document.getElementById('enter-log')
            var selection = target.innerHTML
            registerEnter(enterLog, selection)
            //hideList()
        }
    })

    function createNode(elm, cls, cnt) {
        var element = document.createElement(elm) // Create the type of element you pass in the parameters
        element.classList.add(cls)
        element.innerHTML = cnt
        return element
    }

    function append(parent, el) {
        return parent.appendChild(el) // Append the second parameter(element) to the first one
    }

    var cryptoList = document.getElementById("cryptoList")

    function showList() {
        cryptoList.classList.remove('hide')
    }

    function hideList() {
        cryptoList.classList.add('hide')
    }

    function toggleList() {
        if (cryptoList.classList.contains('hide') && input.value.length > 1)
            showList()
        else
            hideList()
    }

    function getData() {
        // Crypto Currency Public rest API
        var url = 'https://api.coinmarketcap.com/v1/ticker/?limit=10' // Displaying 10 results. Change number for more results
        var list = document.getElementById('cryptoList')
        /* fetch(url)
            .then(function(resp){return resp.json()}) // Transform the data into json
            .then(function (data) {
                let eCurrency = data // Get the results
                return eCurrency.map(function (eCoin) { // Map through the results and for each run the code below
                    var div = createNode('div', 'list-element', '')
                    var a = createNode('a', 'data', eCoin.name +' '+ eCoin.symbol)

                    a.href = '#'
                    append(div, a) // Append all our elements
                    append(list, div)
                })
            }) */
        
        /* IExplorer fixed by replacing fetch for XMLHttpRequest */
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(xhttp.responseText);
                let eCurrency = response // Get the results
                eCurrency.map(function (eCoin) { // Map through the results and for each run the code below
                    var div = createNode('div', 'list-element', '')
                    var a = createNode('a', 'data', eCoin.name + ' ' + eCoin.symbol)

                    a.href = '#'
                    append(div, a) // Append all our elements
                    append(list, div)
                });
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();

    }

    function searchFunction() { // Simple search function 
        var input = null,
            filter = null,
            ul = null,
            li = null,
            a = null,
            i = null

        input = document.getElementById('user-input')
        filter = input.value.toUpperCase()
        div = document.getElementById('cryptoList')
        a = document.getElementsByClassName('list-element')
        for (i = 0; i < a.length; i++) {
            if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
                a[i].style.display = "block"
            } else {
                a[i].style.display = "none"
            }
        }
    }

    function registerEnter(log, reg) {
        if (log.classList.contains('hide'))
            log.classList.remove('hide');
        timeStamp(log, reg)
    }

    function timeStamp(target, history) { // Creates the time stamp
        var date = new Date(),
            stamp = null,
            time = clock(),
            spanHistory = createNode('div', 'log-history', history),
            spanDate = createNode('div', 'log-date', date.toLocaleDateString('sv-SV') + ' ' + time),
            log = createNode('div', 'log', '')
        stampWrapper = createNode('div', 'stamp-wrapper', ''),
            xBtn = createNode('div', 'x-btn', ''),
            xCircle = createNode('div', 'red-close', 'x')

        stampWrapper.append(spanHistory, spanDate)
        xBtn.append(xCircle)
        log.append(stampWrapper, xBtn)
        target.append(log)
    }

    function clock() { // Time
        var date = new Date(),
            hours = date.getHours(),
            minutes = date.getMinutes(),
            ampm = hours >= 12 ? 'pm' : 'am'
        return clockFormat(hours, minutes, ampm)
    }

    function clockFormat(hours, minutes, ampm) { // Time format
        hours = hours % 12
        hours = hours ? hours : 12 // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes

        var time = hours + ':' + minutes + ' ' + ampm
        return time
    }

    // Set up event listener to run the startup process
    // once loading is complete.
    window.addEventListener('load', startup, false)
})();