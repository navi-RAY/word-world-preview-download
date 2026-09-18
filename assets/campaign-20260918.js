const campaignRail = document.querySelector('.campaign-rail');
const campaignPrev = document.querySelector('[data-campaign-prev]');
const campaignNext = document.querySelector('[data-campaign-next]');
if (campaignRail && campaignPrev && campaignNext) {
  const syncCampaignControls = () => {
    campaignPrev.disabled = campaignRail.scrollLeft <= 2;
    campaignNext.disabled = campaignRail.scrollLeft + campaignRail.clientWidth >= campaignRail.scrollWidth - 2;
  };
  const moveCampaign = (direction) => {
    const item = campaignRail.querySelector('figure');
    const gap = parseFloat(getComputedStyle(campaignRail).columnGap) || 0;
    campaignRail.scrollBy({ left: direction * (item.getBoundingClientRect().width + gap), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };
  campaignPrev.addEventListener('click', () => moveCampaign(-1));
  campaignNext.addEventListener('click', () => moveCampaign(1));
  campaignRail.addEventListener('scroll', syncCampaignControls, { passive: true });
  new ResizeObserver(syncCampaignControls).observe(campaignRail);
  syncCampaignControls();
}
