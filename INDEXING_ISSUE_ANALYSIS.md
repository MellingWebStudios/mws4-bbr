# Indexing Issue Analysis: "Crawled - currently not indexed"

## Problem Summary
- **Total Possible Pages**: 3,192 (152 locations × 21 services)
- **Pages Showing "Crawled - currently not indexed"**: 1,920+
- **Issue**: Google crawls pages but refuses to index them

## Root Cause Analysis

### 1. **Massive Page Volume (PRIMARY CAUSE)**
With 3,192 location+service combinations, we're generating an enormous number of programmatically-created pages. This triggers Google's quality filters for:

- **Doorway Pages**: Pages created primarily for search engines rather than users
- **Low-Value Content**: Similar templated content across thousands of pages
- **Indexing Budget Limits**: Google allocates limited crawl budget per site

### 2. **Content Similarity Issues**
Despite the content enrichment functions, many pages likely appear very similar:
- Same template structure
- Minimal unique content per location+service combination
- Limited localInsights data (only covers some locations)
- Generic fallbacks when location-specific data isn't available

### 3. **Over-Optimization Signals**
- 3,192 pages with keyword-optimized URLs (location-service combinations)
- Highly systematic URL patterns that appear algorithmic
- Limited genuine user engagement with so many pages

## Current Content Enrichment Limitations

### Location Insights Coverage
- localInsights object only covers specific locations like "bournbrook", "california", etc.
- Many locations fall back to generic content: `${location.name} residents trust our local expertise...`

### Service Content Variations
- Only 5 services have specific content in serviceSpecificContent
- 16 specialist brand services rely on brandSpecificInfo
- Limited FAQ variations per combination

### Content Depth Issues
- Generated content is relatively short
- Similar structure across all pages
- Minimal unique value per page

## Solutions Strategy

### Immediate Actions (High Priority)

#### 1. **Implement Strategic No-Index for Low-Value Combinations**
- Index only high-value location+service combinations
- No-index specialist brand services for smaller locations
- Focus indexing on main services (boiler-repairs, boiler-servicing, gas-safety)

#### 2. **Consolidate Specialist Services**
Instead of 16 separate specialist pages per location, create:
- Single "Boiler Brand Specialists" page per location
- List all brands on one page
- Reduce from 16×152 = 2,432 pages to 152 pages

#### 3. **Priority Location Strategy**
- Identify top-performing/high-volume locations
- Index all services for priority locations
- Index only main services for smaller locations

### Medium-Term Improvements

#### 1. **Enhanced Content Enrichment**
- Expand localInsights to cover all 152 locations
- Add location-specific case studies
- Include property type information
- Add local heating system facts

#### 2. **Content Quality Improvements**
- Longer, more detailed content per page
- Location-specific pricing information
- Local testimonials and reviews
- Area-specific heating challenges

#### 3. **User Engagement Features**
- Local service booking forms
- Area-specific maintenance tips
- Location weather integration
- Local energy efficiency advice

### Long-Term Strategy

#### 1. **Data-Driven Approach**
- Monitor which location+service combinations get organic traffic
- Index based on actual search demand
- Use Google Search Console performance data

#### 2. **Genuine Local Content**
- Partner with local businesses
- Collect real location-specific case studies
- Add genuine local insights and challenges
- Include local property market information

## Recommended Implementation Plan

### Phase 1: Immediate Reduction (Week 1)
1. **No-index specialist services for locations with population < 10,000**
2. **Consolidate brand specialists into single pages per location**
3. **Focus on 5 main services for all locations**

### Phase 2: Content Enhancement (Weeks 2-4)
1. **Expand localInsights for all 152 locations**
2. **Add genuine location-specific content**
3. **Improve FAQ uniqueness per combination**

### Phase 3: Strategic Indexing (Ongoing)
1. **Monitor GSC performance data**
2. **Gradually re-index high-performing combinations**
3. **Focus on genuine user value over SEO optimization**

## Expected Outcomes

### Short-term (1-2 months)
- Reduce indexed pages from 3,192 to ~800-1,000
- Improve indexing rate for remaining pages
- Better crawl budget utilization

### Long-term (3-6 months)
- Higher quality scores for indexed pages
- Improved search rankings for priority combinations
- Better user engagement metrics
- Reduced "crawled but not indexed" issues

## Technical Implementation

### robots.txt Updates
```
# Block low-priority specialist combinations
Disallow: /*/ferroli-specialists
Disallow: /*/worcester-bosch-specialists
# (for locations with population < threshold)
```

### Meta robots Tags
```html
<!-- For low-priority pages -->
<meta name="robots" content="noindex, follow">
```

### Sitemap Prioritization
- Remove low-priority combinations from XML sitemap
- Focus on high-value location+service combinations
- Use priority scores to guide Google's attention

This strategic approach will resolve the "crawled but not indexed" issue by focusing on quality over quantity and providing genuine value to users rather than attempting to rank for every possible combination.
