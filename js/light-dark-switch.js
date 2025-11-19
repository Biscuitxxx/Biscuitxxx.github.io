let themeFunc = async function () {
    let btn = document.getElementById("theme-btn");
    let root = document.documentElement;

    // 初始化时读取本地存储的主题，没有的话默认亮色
    if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && root.getAttribute('theme') !== 'light')) {
        root.setAttribute('theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        root.setAttribute('theme', 'light');
        localStorage.setItem('theme', 'light');
    }

    btn.addEventListener('click', e => {
        if (root.getAttribute('theme') === 'dark') {
            root.setAttribute('theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            root.setAttribute('theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
};
themeFunc();
