import { DBMapSettings } from '@/types/tsd-map/map-settings';

export const MapSettings = {
  backgroundImageUrl: (settings: DBMapSettings) =>
    settings.background_image_url,
  spaceColor: (settings: DBMapSettings) => settings.space_color,
  horizontalSpacing: (settings: DBMapSettings) => settings.horizontal_spacing,
  verticalSpacing: (settings: DBMapSettings) => settings.vertical_spacing,
  paddingX: (settings: DBMapSettings) => settings.padding_x,
  paddingY: (settings: DBMapSettings) => settings.padding_y,
  spaceRadius: (settings: DBMapSettings) => settings.space_radius,
};
