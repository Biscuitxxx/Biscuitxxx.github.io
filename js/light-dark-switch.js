let themeFunc = async function () {
    let btn = document.getElementById("theme-btn");
    let root = document.documentElement;
    // 新增：默认设置为light模式
    root.setAttribute('theme', 'light');
    localStorage.setItem('theme', 'light');

    btn.addEventListener('click', e => {
        if (root.getAttribute('theme') == 'dark') {
            root.setAttribute('theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            root.setAttribute('theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
};
themeFunc();

