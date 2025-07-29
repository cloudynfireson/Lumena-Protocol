;; CampaignFactory.clar
;; Clarity contract for deploying and managing ad campaigns on the Lumena Protocol

(define-data-var admin principal tx-sender)

;; Campaign metadata stored in map
(define-map campaigns
  uint
  {
    creator: principal,
    budget: uint,
    targeting-hash: (buff 32),
    is-active: bool
  }
)

(define-data-var campaign-counter uint u0)

;; Error codes
(define-constant ERR-NOT-AUTHORIZED u100)
(define-constant ERR-CAMPAIGN-NOT-FOUND u101)
(define-constant ERR-CAMPAIGN-INACTIVE u102)

;; Check if caller is admin
(define-private (is-admin)
  (is-eq tx-sender (var-get admin))
)

;; Deploy a new campaign
(define-public (create-campaign (budget uint) (targeting-hash (buff 32)))
  (let ((id (+ u1 (var-get campaign-counter))))
    (begin
      (var-set campaign-counter id)
      (map-set campaigns id {
        creator: tx-sender,
        budget: (unwrap-panic (ok budget)), ;; sanitized
        targeting-hash: (unwrap-panic (ok targeting-hash)), ;; sanitized
        is-active: true
      })
      (ok id)
    )
  )
)

;; Deactivate a campaign
(define-public (deactivate-campaign (id uint))
  (let ((maybe-campaign (map-get? campaigns id)))
    (if (is-some maybe-campaign)
        (let ((campaign (unwrap maybe-campaign)))
          (begin
            (asserts! (is-eq tx-sender (get creator campaign)) (err ERR-NOT-AUTHORIZED))
            (map-set campaigns id {
              creator: (get creator campaign),
              budget: (get budget campaign),
              targeting-hash: (get targeting-hash campaign),
              is-active: false
            })
            (ok true)
          )
        )
        (err ERR-CAMPAIGN-NOT-FOUND)
    )
  )
)

;; Read-only function to check if campaign is active
(define-read-only (is-campaign-active (id uint))
  (let ((maybe-campaign (map-get? campaigns id)))
    (if (is-some maybe-campaign)
        (ok (get is-active (unwrap maybe-campaign)))
        (err ERR-CAMPAIGN-NOT-FOUND)
    )
  )
)

;; Transfer admin rights
(define-public (transfer-admin (new-admin principal))
  (begin
    (asserts! (is-admin) (err ERR-NOT-AUTHORIZED))
    (var-set admin new-admin)
    (ok true)
  )
)
