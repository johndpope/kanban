/*
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import {Live2DCubismFramework as cubismid} from '../id/cubismid';
import {Live2DCubismFramework as csmstring} from '../type/csmstring';
import {Live2DCubismFramework as csmvector} from '../type/csmvector';
import csmVector = csmvector.csmVector;
import csmString = csmstring.csmString;
import CubismIdHandle = cubismid.CubismIdHandle;

export namespace Live2DCubismFramework
{
    /**
     * @brief モーションカーブの種類
     * 
     * モーションカーブの種類。
     */
    export enum CubismMotionCurveTarget
    {
        CubismMotionCurveTarget_Model,          // モデルに対して
        CubismMotionCurveTarget_Parameter,      // パラメータに対して
        CubismMotionCurveTarget_PartOpacity     // パーツの不透明度に対して
    };


    /**
     * @brief モーションカーブのセグメントの種類
     * 
     * モーションカーブのセグメントの種類。
     */
    export enum CubismMotionSegmentType
    {
        CubismMotionSegmentType_Linear = 0,         // リニア
        CubismMotionSegmentType_Bezier = 1,         // ベジェ曲線
        CubismMotionSegmentType_Stepped = 2,        // ステップ
        CubismMotionSegmentType_InverseStepped = 3  // インバースステップ
    };

    /**
     * @brief モーションカーブの制御点
     * 
     * モーションカーブの制御点。
     */
    export class CubismMotionPoint
    {
        time: number = 0.0;         // 時間[秒]
        value: number = 0.0;        // 値
    };


    /**
     * モーションカーブのセグメントの評価関数
     * 
     * @param   points      モーションカーブの制御点リスト
     * @param   time        評価する時間[秒]
     */
    export interface csmMotionSegmentEvaluationFunction
    {
        (
            points: CubismMotionPoint[],
            time: number
        ): number;
    }

    /**
     * @brief モーションカーブのセグメント
     * 
     * モーションカーブのセグメント。
     */
    export class CubismMotionSegment
    {
        /**
         * @brief コンストラクタ
         * 
         * コンストラクタ。
         */
        public constructor()
        {
            this.evaluate = null;
            this.basePointIndex = 0;
            this.segmentType = 0;
        }

        evaluate: csmMotionSegmentEvaluationFunction;   // 使用する評価関数
        basePointIndex: number;     // 最初のセグメントへのインデックス
        segmentType: number;    // セグメントの種類
    };

    /**
     * @brief モーションカーブ
     * 
     * モーションカーブ。
     */
    export class CubismMotionCurve
    {
        public constructor()
        {
            this.type = CubismMotionCurveTarget.CubismMotionCurveTarget_Model;
            this.segmentCount = 0;
            this.baseSegmentIndex = 0;
            this.fadeInTime = 0.0;
            this.fadeOutTime = 0.0;
        }

        type: CubismMotionCurveTarget;               // カーブの種類
        id: CubismIdHandle;                               // カーブのID
        segmentCount: number;                      // セグメントの個数
        baseSegmentIndex: number;                  // 最初のセグメントのインデックス
        fadeInTime: number;                      // フェードインにかかる時間[秒]
        fadeOutTime: number;                     // フェードアウトにかかる時間[秒]
    };

    /**
    * イベント。
    */
    export class CubismMotionEvent
    {
        fireTime: number = 0.0;
        value: csmString;
    };

    /**
     * @brief モーションデータ
     * 
     * モーションデータ。
     */
    export class CubismMotionData
    {
        public constructor()
        {
            this.duration = 0.0;
            this.loop = false;
            this.curveCount = 0;
            this.eventCount = 0;
            this.fps = 0.0;

            this.curves = new csmVector<CubismMotionCurve>();
            this.segments = new csmVector<CubismMotionSegment>();
            this.points = new csmVector<CubismMotionPoint>();
            this.events = new csmVector<CubismMotionEvent>();
        }

        duration: number;                                   // モーションの長さ[秒]
        loop: boolean;                                      // ループするかどうか
        curveCount: number;                                 // カーブの個数
        eventCount: number;                                 // UserDataの個数
        fps: number;                                        // フレームレート
        curves: csmVector<CubismMotionCurve>;               // カーブのリスト
        segments: csmVector<CubismMotionSegment>;           // セグメントのリスト
        points: csmVector<CubismMotionPoint>;               // ポイントのリスト
        events: csmVector<CubismMotionEvent>;               // イベントのリスト
    };
}