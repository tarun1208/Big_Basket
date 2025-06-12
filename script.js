let cart = [];
let cartTotal = 0;


function addToCart(productName, price, emoji) {
    console.log("addToCart called with:", { productName, price, emoji });
    
    try {
        const existingItem = cart.find(item => item.name === productName);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name: productName,
                price: price,
                emoji: emoji,
                quantity: 1
            });
        }
        updateCartDisplay();
        showToast(`${emoji} ${productName} added to cart!`, 'success');
        console.log("Cart after adding item:", cart);
    } catch (error) {
        console.error("Error in addToCart:", error);
    }
}

function updateCartDisplay() {
    console.log("updateCartDisplay called, cart:", cart);
    
    try {
        const cartCount = document.getElementById('cartCount');
        if (!cartCount) {
            console.error("cartCount element not found!");
            return;
        }
        
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
                
        cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);   
                
        const cartItems = document.getElementById('cartItems');
        const cartTotalElement = document.getElementById('cartTotal');
        
        if (!cartItems || !cartTotalElement) {
            console.error("Cart modal elements not found!");
            return;
        }
                
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        } else {
            cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <span class="item-emoji">${item.emoji}</span>
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>₹${item.price} × ${item.quantity}</p>
                </div>
                <div class="item-actions">
                    <button onclick="changeQuantity('${item.name}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity('${item.name}', 1)">+</button>
                    <button onclick="removeFromCart('${item.name}')" class="remove-btn">🗑️</button>
                </div>
            </div>
            `).join('');
        }
                
        cartTotalElement.textContent = cartTotal;
        console.log("Cart display updated successfully");
    } catch (error) {
        console.error("Error in updateCartDisplay:", error);
    }
}

function changeQuantity(productName, change) {
    const item = cart.find(item => item.name === productName);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productName);
        } else {
            updateCartDisplay();
        }
    }
}

function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCartDisplay();
    showToast('Item removed from cart', 'error');
}

function clearCart() {
    cart = [];
    updateCartDisplay();
    showToast('Cart cleared', 'error');
}

function openCart() {
    document.getElementById('cartModal').style.display = 'block';
    updateCartDisplay();
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

function buyNow(productName, price, emoji) {
    addToCart(productName, price, emoji);
    openCart();
}

function checkout() {
    if (cart.length === 0) {
        showToast('Your cart is empty!', 'error');
        return;
    }
    showToast('Redirecting to checkout...', 'success');
    setTimeout(() => {
        showToast('Order placed successfully! 🎉', 'success');
        clearCart();
        closeCart();
    }, 2000);
}

function openLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    showToast(`Welcome back! Logged in as ${email}`, 'success');
    closeLoginModal();
}

function showSignup() {
    showToast('Signup feature coming soon!', 'success');
}

function subscribeNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    showToast(`Thank you for subscribing! 📧`, 'success');
    event.target.reset();
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
                
    const container = document.getElementById('toastContainer');
    if (container) {
        container.appendChild(toast);
                
        setTimeout(() => toast.classList.add('show'), 100);
                
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (container.contains(toast)) {
                    container.removeChild(toast);
                }
            }, 400);
        }, 3000);
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', () => {
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    }
});

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        searchBox.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            if (searchTerm.length > 2) {
                showToast(`Searching for "${searchTerm}"...`, 'success');
            }
        });
    }
});

// Modal click outside to close
window.addEventListener('click', function(event) {
    const cartModal = document.getElementById('cartModal');
    const loginModal = document.getElementById('loginModal');
                
    if (event.target === cartModal) {
        closeCart();
    }
    if (event.target === loginModal) {
        closeLoginModal();
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded");
    
    // Check if all required elements exist
    const requiredElements = ['cartCount', 'cartModal', 'cartItems', 'cartTotal', 'toastContainer'];
    requiredElements.forEach(id => {
        const element = document.getElementById(id);
        if (!element) {
            console.error(`Missing element with ID: ${id}`);
        } else {
            console.log(`Found element: ${id}`);
        }
    });
    
    // Initialize cart display
    updateCartDisplay();
    
    // Test cart functionality
    console.log("Testing cart functionality...");
    // Uncomment the line below to test
    // addToCart("Test Item", 100, "🧪");
});