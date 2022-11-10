(function( jQuery ){
const select = (target, all) => {
  if(all){
    return document.querySelectorAll(target)
  }
    return document.querySelector(target)
}

selectAppropriateVariant = (productObject) => {
  let selectedVariants = []
  let variantName = ''
  select('[data-key="p-swatches"] .gf_swatch.gf_selected, .customCanvasTypeSelectorContainer .gf_swatch:not(.customSwatch).gf_selected', true).forEach(selectedVariant=>{
    selectedVariants.push(selectedVariant.getAttribute('data-value'))
  })
  variantName = productObject.variants.find(variant=>(variant.options).join(',') === selectedVariants.join(','))
  select('form.AddToCartForm input[name="id"]').value = variantName.id
  select('form.AddToCartForm input[name="id"]').setAttribute('data-value', variantName.id)
  /*
  select('.gf_featured-image').src = variantName.featured_image.src
  select('.zoomImg').src = variantName.featured_image.src*/
  select('.gf_product-price').innerHTML = `$${(+variantName.price/100).toFixed(2)}`
   
}

const createSelector = (option, selected,target, productObject) => {
  let selectorHTML = `<label>${option.name}</label>`
  option.values.forEach((value,index)=>{
    selectorHTML += `<span class="gf_swatch ${value === selected || (selected === 'N/A' && index===0) ? 'gf_selected' : ''}" data-value="${value}" style="margin-bottom: 15px;margin-right: 15px">`
    if(value === 'Vertical'){
      selectorHTML += `<img src='https://cdn-zeptoapps.com/product-personalizer/images/picsifiedww.myshopify.com/Poster-PLUS-3D.jpg?v=1235' alt='Vertical'></span>`
    }else if(value == 'Horizontal'){
      selectorHTML += `<img src='https://cdn-zeptoapps.com/product-personalizer/images/picsifiedww.myshopify.com/Poster-PLUS-HORIZONTAL-3D.jpg?v=1235' alt='Horizontal'></span>`
    }else if(value == '30x40 cm / 12x16”'){
      selectorHTML += `<img src='https://cdn-zeptoapps.com/product-personalizer/images/picsifiedww.myshopify.com/Poster-MINI-3D.jpg?v=1235' alt=${value}></span>`
    }else if(value == '45x60 cm / 18x24”'){
      selectorHTML += `<img src='https://cdn-zeptoapps.com/product-personalizer/images/picsifiedww.myshopify.com/Poster-classic-3D.jpg?v=1235' alt=${value}></span>`
    }else if(value === '60x90 cm / 24x36”'){
      selectorHTML += `<img src='https://cdn-zeptoapps.com/product-personalizer/images/picsifiedww.myshopify.com/Poster-PLUS-3D.jpg?v=1235' alt=${value}></span>`
    }
    else{
      selectorHTML += `<span style="visibility: visible;">${value}</span></span>`
    }
    
  })
  select(target).innerHTML = selectorHTML
  select(target + ' .gf_swatch', true).forEach(swatch=>{
    swatch.addEventListener('click', e=>{
      swatch.parentElement.querySelector('.gf_selected')?.classList.remove('gf_selected')
      swatch.classList.add('gf_selected')
      selectAppropriateVariant(productObject)
    })
  })
}

//Await Product Personalizer
let productPersonalizer = document.querySelector('.product-personalizer')
const ppCheckLoop = setInterval(()=>{
  if(productPersonalizer){
    clearInterval(ppCheckLoop)
    document.querySelector('.pplr_deselect[name="properties[sad]"]').click()
    document.querySelectorAll('[data-name="Orientation"] .gf_swatch').forEach(swatch=>{
      swatch.addEventListener('click', e=>{
      if(swatch.getAttribute('data-value') === 'Horizontal'){
          document.querySelector('span[data-val="Horizontal"]').click()
      }else if(swatch.getAttribute('data-value') === 'Vertical'){
          document.querySelector('span[data-val="Vertical"]').click()
      } 
          
  })
  })
  
  document.querySelectorAll('[data-name="Size"] .gf_swatch').forEach(swatch=>{
      swatch.addEventListener('click', e=>{
      if(swatch.getAttribute('data-value') === '30x40 cm / 12x16”'){
          document.querySelector('span[data-val="30x40 cm / 12x16”"]').click()
      }else if(swatch.getAttribute('data-value') === '45x60 cm / 18x24”'){
          document.querySelector('span[data-val="45x60 cm / 18x24”"]').click()
      } else if(swatch.getAttribute('data-value') === '60x90 cm / 24x36”'){
          document.querySelector('span[data-val="60x90 cm / 24x36”"]').click()
      } 
          
  })
  })
  
  document.querySelectorAll('.customCanvasTypeSelector .gf_swatch').forEach(swatch=>{
      swatch.addEventListener('click', e=>{
      if(swatch.getAttribute('data-value') === 'Framed Poster'){
          document.querySelector('span[data-val="Framed Poster"]').click()
      }else if(swatch.getAttribute('data-value') === 'Poster With Hanger'){
          document.querySelector('span[data-val="Poster With Hanger"]').click()
      } else if(swatch.getAttribute('data-value') === 'Canvas'){
          document.querySelector('span[data-val="Canvas"]').click()
      } 
          
  })
  })

  }else{
    productPersonalizer = document.querySelector('.product-personalizer')
  }
},500)

  select('#m-1668066269115 .gf_swatch', true).forEach(swatch=>{
    swatch.addEventListener('click', async e=>{
      if(!swatch.classList.contains('gf_selected')){
        const selectedHorizontalVariant = select('[data-name="Orientation"] .gf_selected').getAttribute('data-value')
        const selectedSizeVariant = select('[data-name="Size"] .gf_selected').getAttribute('data-value')
        let product = productsObj[swatch.getAttribute('data-product-handle')]
        
        
        /*jQuery.getJSON(window.Shopify.routes.root + `products/${swatch.getAttribute('data-product-handle')}.js`, function(product) {*/
          if(product.options.length === 2){
            select('.gf_swatches-option3').innerHTML = '' 
          }
          product.options_with_value.forEach(option=>{
            if(option.name === 'Orientation'){
              createSelector(option, selectedHorizontalVariant, '[data-name="Orientation"]', product)
            }else if (option.name === 'Size'){
               createSelector(option, selectedSizeVariant, '[data-name="Size"]', product)       
            }
            else {
              if(!select('.gf_swatches-option3')){
                const option3Div = document.createElement('div')
                option3Div.className=`gf_column gf_col_no_tools gf_col-md-12 gf_swatches-selector gf_swatches-option3`
                select('.customCanvasTypeSelector').parentElement.appendChild(option3Div)
              }
              select('.gf_swatches-option3').setAttribute('data-name', option.name)
              createSelector(option, 'N/A', `[data-name="${option.name}"]`, product)
            }
          })
          
          //Asign Event Listeners
          document.querySelectorAll('[data-name="Orientation"] .gf_swatch').forEach(swatch=>{
    swatch.addEventListener('click', e=>{
    if(swatch.getAttribute('data-value') === 'Horizontal'){
        document.querySelector('span[data-val="Horizontal"]').click()
    }else if(swatch.getAttribute('data-value') === 'Vertical'){
        document.querySelector('span[data-val="Vertical"]').click()
    } 
        
})
})

document.querySelectorAll('[data-name="Size"] .gf_swatch').forEach(swatch=>{
    swatch.addEventListener('click', e=>{
    if(swatch.getAttribute('data-value') === '30x40 cm / 12x16”'){
        document.querySelector('span[data-val="30x40 cm / 12x16”"]').click()
    }else if(swatch.getAttribute('data-value') === '45x60 cm / 18x24”'){
        document.querySelector('span[data-val="45x60 cm / 18x24”"]').click()
    } else if(swatch.getAttribute('data-value') === '60x90 cm / 24x36”'){
        document.querySelector('span[data-val="60x90 cm / 24x36”"]').click()
    } 
        
})
})
          
          if(document.querySelector('[data-name="Frame"]')){
            document.querySelectorAll('[data-name="Frame"] .gf_swatch').forEach(swatch=>{
    swatch.addEventListener('click', e=>{
    if(swatch.getAttribute('data-value') === 'Black'){
        if(document.querySelector('[data-name="Orientation"] .gf_swatch.gf_selected').getAttribute('data-value') === 'Vertical'){
            document.querySelector('span[name="properties[Framed Poster Color]"][data-val="Black"]').click()
        }else if(document.querySelector('[data-name="Orientation"] .gf_swatch.gf_selected').getAttribute('data-value') === 'Horizontal'){
           document.querySelector('span[name="properties[Framed Poster color]"][data-val="Black"]').click()
        }
    }else if(swatch.getAttribute('data-value') === 'Dark Wood'){
        if(document.querySelector('[data-name="Orientation"] .gf_swatch.gf_selected').getAttribute('data-value') === 'Vertical'){
            document.querySelector('span[name="properties[Framed Poster Color]"][data-val="Dark Wood"]').click()
        }else if(document.querySelector('[data-name="Orientation"] .gf_swatch.gf_selected').getAttribute('data-value') === 'Horizontal'){
           document.querySelector('span[name="properties[Framed Poster color]"][data-val="Dark Wood"]').click()
        }
    } else if(swatch.getAttribute('data-value') === 'Natural Wood'){
        if(document.querySelector('[data-name="Orientation"] .gf_swatch.gf_selected').getAttribute('data-value') === 'Vertical'){
            document.querySelector('span[name="properties[Framed Poster Color]"][data-val="Wood"]').click()
        }else if(document.querySelector('[data-name="Orientation"] .gf_swatch.gf_selected').getAttribute('data-value') === 'Horizontal'){
           document.querySelector('span[name="properties[Framed Poster color]"][data-val="Wood"]').click()
        }
    } else if(swatch.getAttribute('data-value') === 'White'){
        if(document.querySelector('[data-name="Orientation"] .gf_swatch.gf_selected').getAttribute('data-value') === 'Vertical'){
            document.querySelector('span[name="properties[Framed Poster Color]"][data-val="White"]').click()
        }else if(document.querySelector('[data-name="Orientation"] .gf_swatch.gf_selected').getAttribute('data-value') === 'Horizontal'){
           document.querySelector('span[name="properties[Framed Poster color]"][data-val="White"]').click()
        }
    } 
        
})
})
          }else if(document.querySelector('[data-name="Wall Hanger Color"]')){
            document.querySelectorAll('[data-name="Wall Hanger Color"] .gf_swatch').forEach(swatch=>{
    swatch.addEventListener('click', e=>{
    if(swatch.getAttribute('data-value') === 'Black'){
        if(document.querySelector('[data-name="Orientation"] .gf_swatch.gf_selected').getAttribute('data-value') === 'Vertical'){
            document.querySelector('span[name="properties[Hanger Wood Color]"][data-val="Black"]').click()
        }else if(document.querySelector('[data-name="Orientation"] .gf_swatch.gf_selected').getAttribute('data-value') === 'Horizontal'){
           document.querySelector('span[name="properties[Hanger Wood color]"][data-val="Black"]').click()
        }
    }else if(swatch.getAttribute('data-value') === 'Dark Wood'){
        if(document.querySelector('[data-name="Orientation"] .gf_swatch.gf_selected').getAttribute('data-value') === 'Vertical'){
            document.querySelector('span[name="properties[Hanger Wood Color]"][data-val="Dark Wood"]').click()
        }else if(document.querySelector('[data-name="Orientation"] .gf_swatch.gf_selected').getAttribute('data-value') === 'Horizontal'){
           document.querySelector('span[name="properties[Hanger Wood color]"][data-val="Dark Wood"]').click()
        }
    } else if(swatch.getAttribute('data-value') === 'Natural Wood'){
        if(document.querySelector('[data-name="Orientation"] .gf_swatch.gf_selected').getAttribute('data-value') === 'Vertical'){
            document.querySelector('span[name="properties[Hanger Wood Color]"][data-val="Natural Wood"]').click()
        }else if(document.querySelector('[data-name="Orientation"] .gf_swatch.gf_selected').getAttribute('data-value') === 'Horizontal'){
           document.querySelector('span[name="properties[Hanger Wood color]"][data-val="Natural Wood"]').click()
        }
    } else if(swatch.getAttribute('data-value') === 'White'){
        if(document.querySelector('[data-name="Orientation"] .gf_swatch.gf_selected').getAttribute('data-value') === 'Vertical'){
            document.querySelector('span[name="properties[Hanger Wood Color]"][data-val="White"]').click()
        }else if(document.querySelector('[data-name="Orientation"] .gf_swatch.gf_selected').getAttribute('data-value') === 'Horizontal'){
            document.querySelector('span[name="properties[Hanger Wood color]"][data-val="White"]').click()
        }
    } 
        
})
})
          }else if(document.querySelector('[data-name="Canvas thickness"] .gf_swatch')){
            document.querySelectorAll('[data-name="Canvas thickness"] .gf_swatch').forEach(swatch=>{
    swatch.addEventListener('click', e=>{
    if(swatch.getAttribute('data-value') === 'Slim'){
        if(document.querySelector('[data-name="Orientation"] .gf_swatch.gf_selected').getAttribute('data-value') === 'Vertical'){
            document.querySelector('span[name="properties[Canvas Thickness]"][data-val="Slim"]').click()
        }else if(document.querySelector('[data-name="Orientation"] .gf_swatch.gf_selected').getAttribute('data-value') === 'Horizontal'){
           document.querySelector('span[name="properties[Canvas Thickness]"][data-val="Slim"]').click()
        }
    }else if(swatch.getAttribute('data-value') === 'Thick'){
        if(document.querySelector('[data-name="Orientation"] .gf_swatch.gf_selected').getAttribute('data-value') === 'Vertical'){
            document.querySelector('span[name="properties[Canvas Thickness]][data-val="Thick"]').click()
        }else if(document.querySelector('[data-name="Orientation"] .gf_swatch.gf_selected').getAttribute('data-value') === 'Horizontal'){
           document.querySelector('span[name="properties[Canvas thickness]][data-val="Thick"]').click()
        }
    } 
        
})
})
          }
          
          selectAppropriateVariant(product)
          select('.gf_product-title').innerText = product.title
        /*});*/
      if(swatch.parentElement.querySelector('.gf_selected .removeSelection'))
        swatch.parentElement.querySelector('.gf_selected').removeChild(swatch.parentElement.querySelector('.gf_selected .removeSelection'))
      swatch.parentElement.querySelector('.gf_selected')?.classList.remove('gf_selected')
      swatch.classList.add('gf_selected')
      
      const closeIcon = document.createElement('a')
      closeIcon.addEventListener('click', e=>{
        e.preventDefault()
        e.stopPropagation();
        /*jQuery.getJSON(window.Shopify.routes.root + `products/memory-vault.js`, function(product) {*/
        const product = productsObj['memory-vault']
        if(product.options.length === 2){
          select('.gf_swatches-option3').innerHTML = '' 
        }
        const selectedHorizontalVariant = select('[data-name="Orientation"] .gf_selected').getAttribute('data-value')
        const selectedSizeVariant = select('[data-name="Size"] .gf_selected').getAttribute('data-value')
        product.options_with_value.forEach(option=>{
          if(option.name === 'Orientation'){
            createSelector(option, selectedHorizontalVariant, '[data-name="Orientation"]', product)
          }else if (option.name === 'Size'){
             createSelector(option, selectedSizeVariant, '[data-name="Size"]', product)       
          }
          else {
            if(!select('.gf_swatched-option3')){
              const option3Div = document.createElement('div')
              option3Div.className=`gf_column gf_col_no_tools gf_col-md-12 gf_swatches-selector gf_swatches-option3`
              select('.customCanvasTypeSelector').parentElement.appendChild(option3Div)
            }
            select('.gf_swatches-option3').setAttribute('data-name', option.name)
            createSelector(option, 'N/A', `[data-name="${option.name}"]`, product)
          }
        })
        
        selectAppropriateVariant(product)
        select('.gf_product-title').innerText = product.title
        swatch.querySelector('a.removeSelection').parentElement.removeChild(swatch.querySelector('a.removeSelection'))
        swatch.classList.remove('gf_selected')
      /*});*/
      })
      closeIcon.classList.add('removeSelection')
      closeIcon.href = '#'
      swatch.appendChild(closeIcon)
        
      }
      
      
    })
  })
})( window.GemQuery || JQUERY );
