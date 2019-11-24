 ${e
          .reverse()
          .map(
            ( x ) => `
            <div class="row col">
              <div class="col-sm-5 ">
                <p>${"Purchase date: " + new Date().toLocaleDateString()}<p>
              </div>
              <div class="col-sm-6 col-md-4 col-xl-2">
                ${x
                  .map(
                    (x) => `
                <p>${"Price: " + x.price}</p>`
                  )
                  .join("")}
              </div>
              <div class="col-sm-6 col-md-4 col-xl-4">
                ${x
                  .map(
                    (x) => `
                    <p>${"Package: " + x.name}</p>`
                  )
                  .join("")}
              </div>
              <hr>
              </div>
              `
          )
          .join("")}
              