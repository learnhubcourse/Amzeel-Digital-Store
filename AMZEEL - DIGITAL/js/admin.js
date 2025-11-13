// نظام اللغات في لوحة التحكم
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const lang = this.getAttribute('data-lang');
        
        // تحديث الأزرار النشطة
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // تغيير اللغة
        switchLanguage(lang);
    });
});

// تبديل الأقسام في لوحة التحكم
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        const sectionId = this.getAttribute('data-section');
        
        // تحديث القائمة النشطة
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        
        // إظهار القسم المحدد
        document.querySelectorAll('.admin-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
    });
});

// نظام إضافة منتج جديد
document.querySelector('.btn-primary').addEventListener('click', function() {
    showAdminNotification('فتح نموذج إضافة منتج جديد...');
    
    // محاكاة فتح النموذج
    setTimeout(() => {
        showAdminNotification('نموذج إضافة المنتج جاهز!');
    }, 1000);
});

// إشعارات لوحة التحكم
function showAdminNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #6c63ff;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 1000;
        font-weight: bold;
        box-shadow: 0 5px 15px rgba(108, 99, 255, 0.3);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}

// تحميل البيانات الأولية
document.addEventListener('DOMContentLoaded', function() {
    showAdminNotification('مرحباً في لوحة تحكم AMZEEL DIGITAL!');
});