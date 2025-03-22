
type SocialPlatform = 'facebook' | 'twitter' | 'linkedin' | 'instagram';

export const socialUrls: Record<SocialPlatform, string> = {
  facebook: 'https://www.facebook.com/mmminnovation',
  twitter: 'https://www.twitter.com/mmminnovation',
  linkedin: 'https://www.linkedin.com/company/mmminnovation',
  instagram: 'https://www.instagram.com/mmminnovation'
};

export const openSocialLink = (platform: SocialPlatform) => {
  if (socialUrls[platform]) {
    window.open(socialUrls[platform], '_blank', 'noopener,noreferrer');
  } else {
    console.log('Platform URL not defined:', platform);
  }
};
