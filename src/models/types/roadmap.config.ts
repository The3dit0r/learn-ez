export interface RoadmapGenerationConfig {
  maxLength: number;
  locale: Intl.Locale;
  minLength: number;
  milestoneMaxLength: number;
  milestoneMinLength: number;
}

export const defaultRoadmapGenerationConfig: RoadmapGenerationConfig = {
  maxLength: 10,
  minLength: 5,
  locale: new Intl.Locale("vi"),
  milestoneMinLength: 5,
  milestoneMaxLength: 5,
};