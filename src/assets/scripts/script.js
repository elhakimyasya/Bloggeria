// Create Element
const functionCreateElement = (tag, options) => {
    let element = document.createElement(tag);
    for (var attributes in options) {
        if (attributes == 'class') {
            element.classList.add.apply(element.classList, options[attributes]);
        } else if (attributes == 'content') {
            element.innerHTML = options[attributes];
        } else {
            element[attributes] = options[attributes];
        }
    }

    return element;
};

// Load Script Promise
const functionLoadScript = (source) => {
    return new Promise((resolve, reject) => {
        let element = functionCreateElement('script', {
            src: source,
            async: true,
            defer: true,
        });

        let boolean = false;
        element.onload = element.onreadystatechange = function () {
            if (!boolean && (!this.readyState || this.readyState == 'complete')) {
                boolean = true;

                resolve();
            }
        };

        element.onerror = () => {
            reject(element, source);
        };

        const elementScript = document.getElementsByTagName('script')[0];
        elementScript.parentNode.insertBefore(element, elementScript);
    });
};

// Feed Handler
const elcreativeFeedPosts = (data) => {
    if ('entry' in data.feed) {
        const feedEntry = data.feed.entry;

        // Date
        getDate = (date) => {
            const formattedDate = new Date(date);
            const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(formattedDate);
            const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(formattedDate);
            const dates = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(formattedDate);

            return `${month} ${dates}, ${year}`;
        };

        let entryData = new Array();
        for (let index = 0; index < feedEntry.length; index++) {
            let entryCategory = new Array();
            let entryLink;

            // Categories
            if ('category' in feedEntry[index]) {
                const entryCategories = feedEntry[index].category;
                for (let index1 = 0; index1 < entryCategories.length; index1++) {
                    entryCategory.push(entryCategories[index1].term);

                    break;
                }
            }

            // Links
            for (let index1 = 0; index1 < feedEntry[index].link.length; index1++) {
                if (feedEntry[index].link[index1].rel == 'alternate' && feedEntry[index].link[index1].type == 'text/html') {
                    entryLink = feedEntry[index].link[index1].href;

                    break;
                }
            }

            entryData.push({
                title: feedEntry[index].title.$t,
                published: getDate(feedEntry[index].published.$t.substring(0, 10)),
                updated: getDate(feedEntry[index].updated.$t.substring(0, 10)),
                category: entryCategory,
                link: entryLink,
                author: feedEntry[index].author[0].name.$t,
                thumbnail: feedEntry[index].media$thumbnail != undefined ? feedEntry[index].media$thumbnail.url : '//lh3.googleusercontent.com/-Efigs16DUTQ/YKrJkJaHDKI/AAAAAAAAg_A/_xTHzW1sLmssSTAFEZtZTL_QqseedXjfACLcBGAsYHQ/s1600-rw/index.webp',
                thumbnailAlt: feedEntry[index].author[0].gd$image.src != undefined && feedEntry[index].author[0].gd$image.src != 'https://img1.blogblog.com/img/b16-rounded.gif' ? feedEntry[index].author[0].gd$image.src : 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhPzZlVciGeYVCgCEcfFKeNI8IhtFHNShFG_5Xavi8bej56zOpPRIjHEUZsTsLybpnEZkNJ6M-ivL0lcjLs9YEu_xVrD14a9gtcfxBAzIvwrmAY920GO9gkHtlljlwvRnLcRvD8WL5pbEcmgxCpct-7EJsMymUnpFCMxpTk8i0b0P7O82_kzKoEjeb3/w80/user-icon.webp',
                totalResult: data.feed.openSearch$totalResults.$t,
            });
        }

        return entryData;
    }
};