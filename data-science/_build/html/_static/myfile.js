// 显示谷歌翻译
document.addEventListener('DOMContentLoaded', function() {
    var headerButtons = document.querySelector('.article-header-buttons');
    if (!headerButtons) return;

    // --- 第一部分：初始化谷歌翻译组件 ---
    var div = document.createElement("div");
    div.id = "google_translate_element";
    headerButtons.prepend(div);

    window.googleTranslateElementInit = function() {
        new google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'en,zh-CN,zh-TW,ja,ko,de,ru,fr,es,it,pt,hi,ar,fa',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE
        }, 'google_translate_element');
    };

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    headerButtons.appendChild(script);

    // --- 第二部分：记忆语言选择逻辑 (你的新脚本) ---
    // 更改谷歌翻译框显示的语言
    setTimeout(() => {
        //.VIpgJd-ZVi9od-xl07Ob-lTBxed：这是一个由谷歌自动生成的特定类名。它通常指向翻译小组件中那个可点击的链接元素 (<a>)
        let langLink = document.querySelector(".VIpgJd-ZVi9od-xl07Ob-lTBxed"); // <a> 元素
        // 在 <a> 标签内部查找第一个 <span>。谷歌通常把当前的语言名称（如 "English" 或 "中文"）放在这个 <span> 里
        let langSpan = langLink ? langLink.querySelector("span") : null; // 获取第一个 <span>

        if (!langSpan) return;

        // 1️⃣ 读取 localStorage，恢复用户上次选择的语言
        let savedLang = localStorage.getItem("selectedLanguage") || "EN"; // 默认 "En"
        langSpan.innerText = savedLang;

        // 2️⃣ 监听 <span> 的变化
        let observer = new MutationObserver(() => {
            // 不再循环 mutations，直接获取最终态
            let newLang = langSpan.innerText.trim();
            if (newLang && newLang !== "En") {
                localStorage.setItem("selectedLanguage", newLang);
            }
        });

        // 监听 <span> 内部的文本变化
        observer.observe(langSpan, {
            childList: true,     // 观察子节点变动
            subtree: true,       // 观察所有后代节点（非常重要，因为文字可能嵌套在深层）
            characterData: true, // 观察节点内容变动
        });
    }, 1000); // 延迟 1 秒，确保 Google 翻译插件加载完成
});


document.addEventListener('DOMContentLoaded', function() {

    // 🔧 通用按钮创建函数
    function createButton(svgPath) {
        const btn = document.createElement('button');

        btn.innerHTML = svgPath;

        Object.assign(btn.style, {
            position: 'fixed',
            right: '10px',
            zIndex: '1000',
            width: '35px',
            height: '35px',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(124, 100, 136, 0.9)',
            color: '#fff',
            opacity: '0',          // 默认隐藏
            pointerEvents: 'none'  // 防止误点
        });

        // 悬停效果
        btn.onmouseover = () => btn.style.transform = "scale(1.1)";
        btn.onmouseout = () => btn.style.transform = "scale(1)";

        return btn;
    }

    // 🔼 向上箭头
    const scrollTopBtn = createButton(`
        <svg viewBox="0 0 24 24" width="24" height="24"
            stroke="currentColor" stroke-width="2" fill="none"
            stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5 12 12 5 19 12"></polyline>
        </svg>
    `);

    scrollTopBtn.style.bottom = '120px';

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 🔽 向下箭头（你原来的）
    const scrollBottomBtn = createButton(`
        <svg viewBox="0 0 24 24" width="24" height="24"
            stroke="currentColor" stroke-width="2" fill="none"
            stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
    `);

    scrollBottomBtn.style.bottom = '80px';

    scrollBottomBtn.addEventListener('click', () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    });

    // 📌 添加到页面
    document.body.appendChild(scrollTopBtn);
    document.body.appendChild(scrollBottomBtn);

    // 🚀 控制显示 / 隐藏
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

        // 向上按钮：滚动后才出现
        if (scrollTop > 200) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.pointerEvents = 'auto';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.pointerEvents = 'none';
        }

        // 向下按钮：快到底部时隐藏
        if (scrollTop < maxScroll - 200) {
            scrollBottomBtn.style.opacity = '1';
            scrollBottomBtn.style.pointerEvents = 'auto';
        } else {
            scrollBottomBtn.style.opacity = '0';
            scrollBottomBtn.style.pointerEvents = 'none';
        }
    });
    window.dispatchEvent(new Event('scroll'));
});

    
    
