document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header'); const menu = document.querySelector('.menu-btn'); const nav = document.querySelector('.nav-links');
    const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 20); onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    menu?.addEventListener('click', () => { menu.classList.toggle('active'); nav.classList.toggle('open'); document.body.classList.toggle('nav-open') });
    nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { menu?.classList.remove('active'); nav?.classList.remove('open') }));
    document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
    const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) } }), { threshold: .12 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    document.querySelectorAll('[data-counter]').forEach(el => { const target = +el.dataset.counter; let done = false; const obs = new IntersectionObserver(es => { if (es[0].isIntersecting && !done) { done = true; let n = 0; const step = Math.max(1, Math.ceil(target / 30)); const timer = setInterval(() => { n = Math.min(target, n + step); el.textContent = n; if (n >= target) clearInterval(timer) }, 35); obs.disconnect() } }); obs.observe(el) });
});
document.addEventListener('DOMContentLoaded', () => {
    const newsItems = document.querySelectorAll('.news-item');
    const modal = document.getElementById('news-modal');
    const modalClose = document.getElementById('modal-close');
    const modalDate = document.getElementById('modal-date');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    newsItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault(); // #へのリンク移動を防止

            // 各データ属性から値を取得
            const date = item.getAttribute('data-date');
            const title = item.getAttribute('data-title');
            const content = item.getAttribute('data-content');

            // モーダル内に流し込む
            modalDate.textContent = date;
            modalTitle.textContent = title;
            modalBody.textContent = content;

            // モーダルを表示
            modal.classList.add('is-open');
        });
    });

    // 閉じるボタン
    modalClose.addEventListener('click', () => {
        modal.classList.remove('is-open');
    });

    // 背景クリックで閉じる
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('is-open');
        }
    });
});