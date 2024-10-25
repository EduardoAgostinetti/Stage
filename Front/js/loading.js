function showLoading() {
    
    var overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; 
    overlay.style.zIndex = '1000';
    document.body.appendChild(overlay);

    var loading = document.createElement('div');
    loading.id = 'loading';
    
    
    loading.style.position = 'fixed';
    loading.style.top = '50%';
    loading.style.left = '50%';
    loading.style.transform = 'translate(-50%, -50%)';
    loading.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    loading.style.padding = '20px';
    loading.style.borderRadius = '8px';
    loading.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
    loading.style.zIndex = '1001';

    var loadingIcon = document.createElement('div');
    loadingIcon.className = 'loading-icon';
    loadingIcon.innerHTML = '<i class="fa fa-spinner fa-spin"></i>';
    
    var loadingText = document.createElement('div');
    loadingText.className = 'loading-text';
    loadingText.textContent = 'Carregando...';
    
    loading.appendChild(loadingIcon);
    loading.appendChild(loadingText);
    
    document.body.appendChild(loading);
    
    loading.style.display = 'block';

}

function hideLoading() {
    var loading = document.getElementById('loading');
    if (loading) {
        loading.parentNode.removeChild(loading);
    }

    // Remove o overlay também
    var overlay = document.querySelector('.overlay');
    if (overlay) {
        overlay.parentNode.removeChild(overlay);
    }
}
