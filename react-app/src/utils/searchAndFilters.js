export default function filterResults(list,search,query){

    let filteredList = list

    if(search.length){
        filteredList = (broadSearch(filteredList,search))
    }
    if(query.city.length){
        filteredList = queryCity(filteredList,query.city)
    }
    if(query.state.length){
        filteredList = queryState(filteredList,query.state)
    }
    if(query.categories.length){
        filteredList = queryCategories(filteredList,query.categories)
    }
    if(query.price.length){
        filteredList = queryPrice(filteredList,query.price)
    }
    if(query.features.length){
        filteredList = queryFeatures(filteredList,query.featues)
    }
    return filteredList
}


function queryCity(list,query){
    return list.filter(el => new RegExp(query, 'gi').test(el.city))
}
function queryState(list,query){
    return list.filter(el => new RegExp(query, 'gi').test(el.state))
}
function queryCategories(list,query){
    let filteredList = list
    let queries = query.split(',')
    for(let cat in queries){
        filteredList = filteredList.filter(el=> scanCategories(cat,el.categories))
    }
    return filteredList
}
function queryPrice(list,query){
    let filteredList = []
    let prices = query.split(',')
    for(let price in prices){
        filteredList.concat(list.filter(el=>el.price == price))
    }
    return filteredList
}

function queryFeatures(list,query){
    features = query.split(',')
    let filteredList = list
    for(let feat in featues){
        filteredList = filteredList.filter(el=> new RegExp(feat, 'gi').test(el.features))
    }
    return filteredList
}

// function querySearch(list,query){
//     filteredList = []
//     for(let biz in list){
//         if(query.city && new RegExp(query.city, 'gi').test(biz.city)){
//             filteredList.push(biz)
//             continue
//         }
//         if(query.state && new RegExp(query.state, 'gi').test(biz.state)){
//             filteredList.push(biz)
//             continue
//         }
//         if(query.price){
//             let prices = query.price.split(',')
//             for(let price in prices){
//                 if(price == biz.price){
//                     filteredList.push(biz)
//                     continue
//                 }
//             }
//         }
//         if(query.categories){
//             let categories = query.categories.split(',')
//             for(let cat in categories){
//                 if(scanCategories(cat,biz.categories)){
//                     filteredList.push(biz)
//                     continue
//                 }
//             }
//         }
//         if(query.features){
//             let features = query.features.split(',')
//             for(let feat in features){
//                 if(new RegExp(feat, 'gi').test(biz.features)){
//                     filteredList.push(biz)
//                     continue
//                 }
//             }
//         }
//     }
//     return filteredList
// }

function broadSearch(list,searchTerm){
    const filteredList = []
    for(let biz in list){
        if (new RegExp(searchTerm, 'gi').test(biz.name)){
            filteredList.push(biz)
            continue
        }
        if (new RegExp(searchTerm, 'gi').test(biz.city)){
            filteredList.push(biz)
            continue
        }
        if (new RegExp(searchTerm, 'gi').test(biz.address)){
            filteredList.push(biz)
            continue
        }
        if(scanCategories(searchTerm,biz.categories)){
            filteredList.push(biz)
        }
    }
    return filteredList
}

function scanCategories(searchTerm,categoriesList){
    for(let cat in categoriesList){
        if(cat.categoryName.toLowerCase()==searchTerm.toLowerCase()) return true
    }
    return false
}
