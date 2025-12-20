// Smooth scroll to support section
function scrollToSupport() {
    const supportSection = document.getElementById('support-section');
    if (supportSection) {
        supportSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Copy account number to clipboard
function copyAccountNumber() {
    const accountNumber = '1848108108';
    
    // Create temporary input element
    const tempInput = document.createElement('input');
    tempInput.value = accountNumber;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices
    
    try {
        document.execCommand('copy');
        
        // Show success feedback
        showNotification('✓ Đã sao chép số tài khoản!', 'success');
    } catch (err) {
        showNotification('Không thể sao chép. Vui lòng thử lại.', 'error');
    }
    
    document.body.removeChild(tempInput);
}

// Show notification
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 600;
        font-family: 'Quicksand', sans-serif;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Handle package selection
function selectPackage(packageType) {
    let message = '';
    
    switch(packageType) {
        case '50k':
            message = 'Cảm ơn bạn đã chọn gói 50.000đ/tháng! Vui lòng chuyển khoản với nội dung: "UNGHO50K [Tên của bạn]"';
            break;
        case '100k':
            message = 'Cảm ơn bạn đã chọn gói 100.000đ/tháng! Vui lòng chuyển khoản với nội dung: "UNGHO100K [Tên của bạn]"';
            break;
        case 'custom':
            message = 'Cảm ơn bạn đã muốn ủng hộ! Vui lòng chuyển khoản với nội dung: "UNGHO [Tên của bạn]"';
            break;
    }
    
    showNotification(message, 'success');
    
    // Scroll to bank info
    setTimeout(() => {
        const bankSection = document.querySelector('.bank-transfer');
        if (bankSection) {
            bankSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
            
            // Highlight the bank info section briefly
            bankSection.style.animation = 'pulse 1s ease-in-out';
            setTimeout(() => {
                bankSection.style.animation = '';
            }, 1000);
        }
    }, 500);
}

// Add pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
            box-shadow: 0 4px 20px rgba(255, 208, 91, 0.15);
        }
        50% {
            transform: scale(1.02);
            box-shadow: 0 8px 30px rgba(255, 208, 91, 0.35);
        }
    }
`;
document.head.appendChild(pulseStyle);

// Share on social media
function shareOnSocial() {
    const shareData = {
        title: 'Ủng hộ Hanoi Pet Adoption',
        text: 'Cùng nhau giúp đỡ những thú cưng bị bỏ rơi!',
        url: window.location.href
    };
    
    // Check if Web Share API is available
    if (navigator.share) {
        navigator.share(shareData)
            .then(() => showNotification('Cảm ơn bạn đã chia sẻ! ❤️', 'success'))
            .catch((err) => {
                if (err.name !== 'AbortError') {
                    fallbackShare();
                }
            });
    } else {
        fallbackShare();
    }
}

// Fallback share function
function fallbackShare() {
    const modal = document.createElement('div');
    modal.className = 'share-modal';
    modal.innerHTML = `
        <div class="share-modal-content">
            <div class="share-modal-header">
                <h3>Chia sẻ trang</h3>
                <button onclick="this.closest('.share-modal').remove()" class="close-btn">×</button>
            </div>
            <div class="share-modal-body">
                <p>Sao chép link và chia sẻ với bạn bè:</p>
                <div class="share-link-container">
                    <input type="text" value="${window.location.href}" readonly class="share-link-input" id="shareLink">
                    <button onclick="copyShareLink()" class="copy-link-btn">Sao chép</button>
                </div>
                <div class="social-share-buttons">
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank" class="social-share-btn facebook">
                        Facebook
                    </a>
                    <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=Cùng ủng hộ Hanoi Pet Adoption!" target="_blank" class="social-share-btn twitter">
                        Twitter
                    </a>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
        animation: fadeIn 0.3s ease-out;
    `;
    
    document.body.appendChild(modal);
    
    // Add styles for modal content
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .share-modal-content {
            background: white;
            border-radius: 24px;
            padding: 32px;
            max-width: 500px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.3s ease-out;
        }
        
        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .share-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
        }
        
        .share-modal-header h3 {
            font-family: 'Fredoka', sans-serif;
            font-size: 1.8rem;
            color: #2D2D2D;
            margin: 0;
        }
        
        .close-btn {
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #5A5A5A;
            line-height: 1;
            transition: color 0.3s ease;
        }
        
        .close-btn:hover {
            color: #2D2D2D;
        }
        
        .share-modal-body p {
            color: #5A5A5A;
            margin-bottom: 16px;
        }
        
        .share-link-container {
            display: flex;
            gap: 8px;
            margin-bottom: 24px;
        }
        
        .share-link-input {
            flex: 1;
            padding: 12px 16px;
            border: 2px solid #FFD05B;
            border-radius: 12px;
            font-family: 'Quicksand', sans-serif;
            font-size: 0.9rem;
        }
        
        .copy-link-btn {
            background: #FFD05B;
            border: none;
            padding: 12px 24px;
            border-radius: 12px;
            font-weight: 700;
            cursor: pointer;
            font-family: 'Fredoka', sans-serif;
            transition: all 0.3s ease;
        }
        
        .copy-link-btn:hover {
            background: #F5B800;
            transform: scale(1.05);
        }
        
        .social-share-buttons {
            display: flex;
            gap: 12px;
        }
        
        .social-share-btn {
            flex: 1;
            padding: 12px 20px;
            border-radius: 12px;
            text-align: center;
            text-decoration: none;
            font-weight: 700;
            font-family: 'Fredoka', sans-serif;
            transition: all 0.3s ease;
        }
        
        .social-share-btn.facebook {
            background: #1877F2;
            color: white;
        }
        
        .social-share-btn.facebook:hover {
            background: #0d5dbf;
            transform: translateY(-2px);
        }
        
        .social-share-btn.twitter {
            background: #1DA1F2;
            color: white;
        }
        
        .social-share-btn.twitter:hover {
            background: #0c85d0;
            transform: translateY(-2px);
        }
    `;
    document.head.appendChild(modalStyle);
    
    // Close modal on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Copy share link
function copyShareLink() {
    const shareLinkInput = document.getElementById('shareLink');
    if (shareLinkInput) {
        shareLinkInput.select();
        shareLinkInput.setSelectionRange(0, 99999);
        
        try {
            document.execCommand('copy');
            showNotification('✓ Đã sao chép link!', 'success');
        } catch (err) {
            showNotification('Không thể sao chép. Vui lòng thử lại.', 'error');
        }
    }
}

// Add scroll reveal animation for elements
function revealOnScroll() {
    const reveals = document.querySelectorAll('.cost-card, .method-card, .sponsor-card, .inkind-item, .package-card');
    
    reveals.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize scroll reveal
document.addEventListener('DOMContentLoaded', () => {
    // Set initial state for reveal elements
    const reveals = document.querySelectorAll('.cost-card, .method-card, .sponsor-card, .inkind-item, .package-card');
    reveals.forEach((element) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease-out';
    });
    
    // Check on load
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
});

// Add floating effect to hero paws
document.addEventListener('DOMContentLoaded', () => {
    const paws = document.querySelectorAll('.paw-decoration');
    paws.forEach((paw, index) => {
        paw.style.animationDelay = `${index * 0.5}s`;
    });
});

// Console easter egg
console.log('%c🐾 Cảm ơn bạn đã quan tâm đến Hanoi Pet Adoption! 🐾', 'font-size: 20px; color: #FFD05B; font-weight: bold;');
console.log('%cMỗi khoản đóng góp đều giúp chúng tôi cứu sống những thú cưng bị bỏ rơi. ❤️', 'font-size: 14px; color: #FFB5D8;');
