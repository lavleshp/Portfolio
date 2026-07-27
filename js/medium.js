const feed =
"https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@lavleshpandey2021";

fetch(feed)
.then(response => response.json())
.then(data => {

    const container = document.getElementById("medium-posts");

    container.innerHTML = "";

    data.items.slice(0,2).forEach(post => {

        // Extract first image from article HTML
        let image = "img/blog/default.jpg";

        const parser = new DOMParser();
        const doc = parser.parseFromString(post.description, "text/html");

        const img = doc.querySelector("img");

        if(img){
            image = img.src;
        }

        // Clean description
        let description = doc.body.textContent
            .replace(/\s+/g," ")
            .trim();

        description = description.substring(0,170) + "...";

        // Format date
        const date = new Date(post.pubDate).toLocaleDateString(
            "en-US",
            {
                year:"numeric",
                month:"short",
                day:"numeric"
            }
        );

        container.innerHTML += `

        <div class="col-lg-6">

            <a href="${post.link}"
               target="_blank"
               class="mil-blog-card mil-mb-60">

                <div class="mil-cover-frame mil-up">

                    <img src="${image}"
                         alt="${post.title}">

                </div>

                <div class="mil-post-descr">

                    <div class="mil-labels mil-up mil-mb-30">

                        <div class="mil-label mil-upper mil-accent">
                            MEDIUM
                        </div>

                        <div class="mil-label mil-upper">
                            ${date}
                        </div>

                    </div>

                    <h4 class="mil-up mil-mb-30">
                        ${post.title}
                    </h4>

                    <p class="mil-post-text mil-up mil-mb-30">
                        ${description}
                    </p>

                    <div class="mil-link mil-dark mil-arrow-place mil-up">
                        <span>Read on Medium</span>
                    </div>

                </div>

            </a>

        </div>

        `;

    });

})
.catch(error => {
    console.error("Medium Feed Error:", error);
});