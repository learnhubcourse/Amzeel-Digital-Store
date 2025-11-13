// كود جافاسكريبت أساسي
console.log("AMZEEL DIGITAL Website Loaded");

// تأثيرات بسيطة للروابط
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});
// نظام التصفية في المتجر
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function() {
        // إزالة النشط من جميع الأزرار
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // إضافة النشط للزر المختار
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        filterProducts(filter);
    });
});

function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        if (category === 'all') {
            product.style.display = 'block';
        } else {
            if (product.getAttribute('data-category') === category) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        }
    });
}

// نظام السلة
let cart = [];

// إضافة منتج إلى السلة
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.price').textContent;
        
        const product = {
            name: productName,
            price: productPrice,
            id: Date.now() // معرف فريد للمنتج
        };
        
        cart.push(product);
        updateCartCounter();
        showNotification('تمت إضافة المنتج إلى السلة 🛒');
        
        // تأثير على الزر
        this.textContent = 'تم الإضافة ✓';
        this.style.background = '#4ade80';
        setTimeout(() => {
            this.textContent = 'أضف إلى السلة';
            this.style.background = '#6c63ff';
        }, 2000);
    });
});

// تحديث عداد السلة
function updateCartCounter() {
    const cartCounter = document.querySelector('.cart-count');
    if (cartCounter) {
        cartCounter.textContent = cart.length;
        // تأثير على العداد
        cartCounter.style.transform = 'scale(1.3)';
        setTimeout(() => {
            cartCounter.style.transform = 'scale(1)';
        }, 300);
    }
}

// أزرار طلب الخدمة
document.querySelectorAll('.service-btn').forEach(button => {
    button.addEventListener('click', function() {
        const serviceCard = this.closest('.service-card');
        const serviceName = serviceCard.querySelector('h3').textContent;
        showNotification(`سيتم التواصل معك regarding ${serviceName} 📞`);
        
        // تأثير على الزر
        this.textContent = 'جاري التوجيه...';
        this.style.background = '#4ade80';
        setTimeout(() => {
            this.textContent = 'اطلب الخدمة';
            this.style.background = '#6c63ff';
        }, 2000);
    });
});
// نظام الإشعارات المحسن
function showNotification(message, type = 'info') {
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // ألوان مختلفة لأنواع الإشعارات
    const colors = {
        success: '#4ade80',
        error: '#ff6b6b', 
        info: '#6c63ff',
        warning: '#fbbf24'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 15px 25px;
        border-radius: 12px;
        z-index: 10000;
        font-weight: bold;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        transform: translateX(400px);
        transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        max-width: 300px;
        word-wrap: break-word;
        border-left: 4px solid rgba(255, 255, 255, 0.3);
    `;
    
    notification.textContent = message;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // إظهار الإشعار
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // إخفاء الإشعار بعد 4 ثوان
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 400);
    }, 4000);
    
    // إمكانية إغلاق الإشعار بالنقر
    notification.addEventListener('click', function() {
        this.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(this)) {
                document.body.removeChild(this);
            }
        }, 400);
    });
}
    }, 3000);
}// نظام الموسيقى
let isPlaying = false;
let currentAudio = null;

// عناصر المشغل
const playBtn = document.querySelector('.play');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress-bar');
const currentTimeEl = document.querySelector('.current-time');
const durationEl = document.querySelector('.duration');

// أحداث المشغل
playBtn.addEventListener('click', togglePlay);

function togglePlay() {
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        playBtn.textContent = '⏸';
        simulatePlayback();
    } else {
        playBtn.textContent = '▶';
        simulatePause();
    }
}

// محاكاة التشغيل (للتجربة)
function simulatePlayback() {
    let progressWidth = 30;
    const interval = setInterval(() => {
        if (!isPlaying) {
            clearInterval(interval);
            return;
        }
        
        progressWidth += 0.5;
        if (progressWidth >= 100) {
            progressWidth = 0;
            playBtn.textContent = '▶';
            isPlaying = false;
            clearInterval(interval);
        }
        
        progress.style.width = progressWidth + '%';
        updateTimeDisplay(progressWidth);
    }, 100);
}

function simulatePause() {
    // توقف المحاكاة
}

function updateTimeDisplay(progress) {
    const totalSeconds = 225; // 3:45 دقيقة
    const currentSeconds = Math.floor((progress / 100) * totalSeconds);
    
    const minutes = Math.floor(currentSeconds / 60);
    const seconds = currentSeconds % 60;
    
    currentTimeEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// النقر على شريط التقدم
progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    progress.style.width = (percent * 100) + '%';
    updateTimeDisplay(percent * 100);
});

// أزرار الاستماع
document.querySelectorAll('.preview-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const beatName = this.closest('.beat-card').querySelector('h3').textContent;
        showNotification(`جاري تشغيل: ${beat} 🎵`);
        
        // تأثير على الزر
        this.textContent = 'جاري التشغيل...';
        this.style.background = '#6c63ff';
        setTimeout(() => {
            this.textContent = 'استمع';
            this.style.background = '#333';
        }, 2000);
    });
});

// أزرار شراء الـ Beats
document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const beatCard = this.closest('.beat-card');
        const beatName = beatCard.querySelector('h3').textContent;
        const beatPrice = '$29';
        
        addToCart({
            name: beatName,
            price: beatPrice,
            type: 'music'
        });
    });
});

// نظام السلة المتقدم
function addToCart(product) {
    cart.push(product);
    updateCartCounter();
    updateCartDisplay();
    showNotification(`تمت إضافة ${product.name} إلى السلة 🛒`);
}

function updateCartDisplay() {
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.total-amount');
    const summaryItems = document.querySelector('.summary-items');
    const finalAmount = document.querySelector('.final-amount');
    
    let total = 0;
    let itemsHTML = '';
    let summaryHTML = '';
    
    cart.forEach((item, index) => {
        const price = parseFloat(item.price.replace('$', ''));
        total += price;
        
        itemsHTML += `
            <div class="cart-item">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <span class="item-price">${item.price}</span>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})">🗑️</button>
            </div>
        `;
        
        summaryHTML += `
            <div class="summary-item">
                <span>${item.name}</span>
                <span>${item.price}</span>
            </div>
        `;
    });
    
    cartItems.innerHTML = itemsHTML;
    summaryItems.innerHTML = summaryHTML;
    cartTotal.textContent = `$${total.toFixed(2)}`;
    finalAmount.textContent = `$${total.toFixed(2)}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCounter();
    updateCartDisplay();
    showNotification('تم إزالة المنتج من السلة');
}

// فتح وإغلاق السلة
document.querySelector('.cart-icon').addEventListener('click', openCart);
document.querySelector('.close-cart').addEventListener('click', closeCart);
document.querySelector('.checkout-btn').addEventListener('click', openPayment);

function openCart() {
    updateCartDisplay();
    document.getElementById('cartModal').style.display = 'flex';
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

function openPayment() {
    if (cart.length === 0) {
        showNotification('السلة فارغة! أضف منتجات أولاً');
        return;
    }
    closeCart();
    document.getElementById('paymentModal').style.display = 'flex';
}

// إغلاق نظام الدفع
document.querySelector('.close-payment').addEventListener('click', closePayment);

function closePayment() {
    document.getElementById('paymentModal').style.display = 'none';
}

// معالجة الدفع
document.querySelector('.payment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
    const total = cart.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')), 0);
    
    showNotification(`جاري معالجة الدفع بقيمة $${total.toFixed(2)}...`);
    
    // محاكاة عملية الدفع
    setTimeout(() => {
        showNotification('✅ تمت عملية الدفع بنجاح! شكراً لشرائك');
        cart = [];
        updateCartCounter();
        closePayment();
        
        // إعادة تعيين النموذج
        this.reset();
    }, 3000);
});

// إغلاق النوافذ بالنقر خارجها
window.addEventListener('click', function(e) {
    const cartModal = document.getElementById('cartModal');
    const paymentModal = document.getElementById('paymentModal');
    
    if (e.target === cartModal) {
        closeCart();
    }
    if (e.target === paymentModal) {
        closePayment();
    }
});// نظام اللغات المتكامل
let currentLanguage = 'ar';

// عناصر تبديل اللغة
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const lang = this.id.replace('lang-', '');
        switchLanguage(lang);
    });
});

function switchLanguage(lang) {
    currentLanguage = lang;
    
    // تحديث اتجاه الصفحة
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    // تحديث النصوص
    document.querySelectorAll('[data-ar]').forEach(element => {
        element.textContent = element.getAttribute(`data-${lang}`);
    });
    
    // تحديد النصوص البديلة
    document.querySelectorAll('[data-ar-placeholder]').forEach(element => {
        element.placeholder = element.getAttribute(`data-${lang}-placeholder`);
    });
    
    // تحديث أزرار اللغة النشطة
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`lang-${lang}`).classList.add('active');
    
    showNotification(lang === 'ar' ? 'تم التغيير إلى العربية' : 'Switched to English');
}

// حفظ اللغة المفضلة
function saveLanguagePreference(lang) {
    localStorage.setItem('preferred-language', lang);
}

function loadLanguagePreference() {
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang) {
        switchLanguage(savedLang);
    }
}

// تحميل تفضيلات اللغة عند بدء التشغيل
document.addEventListener('DOMContentLoaded', function() {
    loadLanguagePreference();
});

// تحديث الـ Navbar لإضافة أزرار اللغة
// استبدل قسم الـ language-switcher في navbar بهذا:
document.querySelector('.nav-links').innerHTML += `
    <div class="language-switcher">
        <button id="lang-ar" class="lang-btn active">العربية</button>
        <button id="lang-en" class="lang-btn">English</button>
    </div>
`;// نظام إظهار/إخفاء لوحة التحكم
function checkAdminAccess() {
    // هذا يمكن أن يكون تسجيل دخول أو تحقق من الصلاحيات
    // حالياً سنخفي الرابط عن الجميع
    const adminAccess = document.querySelector('.admin-access');
    adminAccess.style.display = 'none';
    
    // إذا أردت إظهار الرابط للمسؤولين فقط، فاستخدم:
    // if (userIsAdmin) {
    //     adminAccess.classList.add('admin-visible');
    // }
}

// استدعاء الدالة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    checkAdminAccess();
});

// نظام للوصول إلى لوحة التحكم (كود سري)
let adminCode = '';
document.addEventListener('keypress', function(e) {
    adminCode += e.key;
    
    if (adminCode.includes('admin123')) {
        document.querySelector('.admin-access').classList.add('admin-visible');
        showNotification('تم تفعيل رابط لوحة التحكم للمسؤول');
        adminCode = '';
    }
    
    // إعادة تعيين الكود إذا كان طويلاً
    if (adminCode.length > 20) {
        adminCode = '';
    }
});// نظام الكود السري للوصول إلى لوحة التحكم
let adminCode = '';
let adminAttempts = 0;
const correctCode = 'amzeel2024'; // الكود السري
const maxAttempts = 5; // الحد الأقصى للمحاولات

// كشف كتابة الكود السري
document.addEventListener('keypress', function(e) {
    // إضافة الحرف المضغوط إلى الكود
    adminCode += e.key.toLowerCase();
    
    console.log('الكود المدخل:', adminCode); // لأغراض التصحيح
    
    // التحقق إذا كان الكود صحيحاً
    if (adminCode.includes(correctCode)) {
        activateAdminPanel();
        adminCode = ''; // إعادة تعيين الكود
    }
    
    // التحقق من المحاولات الفاشلة
    if (adminCode.length > correctCode.length + 3) {
        adminAttempts++;
        adminCode = ''; // إعادة تعيين الكود
        
        if (adminAttempts >= maxAttempts) {
            showNotification('❌ تم تجاوز الحد الأقصى للمحاولات. حاول لاحقاً.');
            setTimeout(() => {
                adminAttempts = 0;
            }, 30000); // إعادة التعيين بعد 30 ثانية
        } else {
            showNotification(`❌ كود خاطئ. المحاولات المتبقية: ${maxAttempts - adminAttempts}`);
        }
    }
});

// تفعيل لوحة التحكم
function activateAdminPanel() {
    const adminAccess = document.querySelector('.admin-access');
    
    // إظهار رابط لوحة التحكم
    adminAccess.style.display = 'block';
    adminAccess.style.position = 'fixed';
    adminAccess.style.bottom = '20px';
    adminAccess.style.left = '20px';
    adminAccess.style.zIndex = '1000';
    
    // إضافة تأثير مرئي
    adminAccess.style.animation = 'bounce 2s infinite';
    
    showNotification('🎉 تم تفعيل لوحة التحكم بنجاح!', 'success');
    
    // حفظ حالة التفعيل في localStorage
    localStorage.setItem('adminPanelActive', 'true');
    
    console.log('✅ لوحة التحكم مفعلة الآن!');
}

// التحقق من التفعيل السابق عند تحميل الصفحة
function checkAdminStatus() {
    const isActive = localStorage.getItem('adminPanelActive');
    
    if (isActive === 'true') {
        activateAdminPanel();
    }
}

// استدعاء التحقق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    checkAdminStatus();
});

// إضافة تأثير bounce للـ CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        60% {
            transform: translateY(-5px);
        }
    }
`;
document.head.appendChild(style);
// نظام أمان إضافي للكود السري
let lastKeyTime = 0;
const keyTimeout = 3000; // 3 ثواني

document.addEventListener('keypress', function(e) {
    const currentTime = Date.now();
    
    // إعادة تعيين الكود إذا مر وقت طويل بين الضغطات
    if (currentTime - lastKeyTime > keyTimeout) {
        adminCode = '';
        console.log('🔄 تم إعادة تعيين الكود بسبب الوقت');
    }
    
    lastKeyTime = currentTime;
    
    // تجاهل بعض المفاتيح الخاصة
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Tab') {
        return;
    }
    
    // إضافة الحرف إلى الكود
    adminCode += e.key.toLowerCase();
    console.log('الكود الحالي:', adminCode);
    
    // التحقق من الكود
    checkAdminCode();
});

function checkAdminCode() {
    if (adminCode.includes(correctCode)) {
        // الكود صحيح
        adminAttempts = 0; // إعادة تعيين المحاولات
        activateAdminPanel();
        adminCode = '';
        
        // إخفاء لوحة التحكم تلقائياً بعد ساعة
        setTimeout(() => {
            deactivateAdminPanel();
        }, 60 * 60 * 1000); // 60 دقيقة
        
    } else if (adminCode.length >= correctCode.length) {
        // الكود خاطئ
        adminAttempts++;
        adminCode = '';
        
        if (adminAttempts >= maxAttempts) {
            showNotification('🔒 تم تعطيل النظام مؤقتاً بسبب المحاولات الفاشلة. حاول بعد 5 دقائق.', 'error');
            // تعطيل النظام لمدة 5 دقائق
            setTimeout(() => {
                adminAttempts = 0;
                showNotification('✅ تم تفعيل النظام مرة أخرى. يمكنك المحاولة الآن.', 'success');
            }, 5 * 60 * 1000);
        } else {
            showNotification(`❌ كود خاطئ. المحاولات المتبقية: ${maxAttempts - adminAttempts}`, 'warning');
        }
    }
}

// تعطيل لوحة التحكم
function deactivateAdminPanel() {
    const adminAccess = document.querySelector('.admin-access');
    adminAccess.style.display = 'none';
    localStorage.removeItem('adminPanelActive');
    showNotification('🔒 تم إغلاق لوحة التحكم تلقائياً للأمان', 'info');
}