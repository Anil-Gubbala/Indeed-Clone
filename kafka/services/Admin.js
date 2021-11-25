const sql = {
  reviewesPerDay:
    "select Date(date) as dateOnly, count(*) as total FROM indeed.reviews WHERE date  between  '2021-11-15' and '2021-11-25' group by dateOnly ;",
  top10ReviewedCompanies:
    "select  companyId, count(*) as num from indeed.reviews group by companyId order by num DESC  limit 5 ",
  top10RatedCompanies:
    "select  companyId, AVG(rating) as avgRating from indeed.reviews group by companyId order by avgRating DESC  limit 5 ",
  topUsers:
    "select  userId, count(*) as total from indeed.reviews where status = 0 group by userId order by total desc",
  topCEO: "similar to company",
};
